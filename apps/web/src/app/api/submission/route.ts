import { authOptions } from "@/lib/auth.action";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { SubbmissionInput } from "@repo/common/zod";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { dbCLient } from "../../db";

import { getProblem } from "@/lib/problems";
import axios from "axios";

console.log(process.env.RAPIDAPI_KEY!);

const SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!;
const JUDGE0_URI = process.env.JUDGE0_URI || "https://judge0-ce.p.rapidapi.com";
const CLOUDFLARE_TURNSTILE_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function POST(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json(
          {
            message: "You must be logged in to submit a problem",
          },
          {
            status: 401,
          }
        );
      }

   const userId = session.user.id;
   //TODO:Ratelimiting

   const subbmissionInput = SubbmissionInput.safeParse(await req.json());

   if(!subbmissionInput.success) {
    return NextResponse.json(
        {
            message: "Invalid Input",
            // error: subbmissionInput.error.errors,
        },
        
        {
            status: 400,
        }
     );
   }

   let formData = new FormData();
  //  formData.append("secret", SECRET_KEY); 
   formData.append("response", subbmissionInput.data.token);

  //  const result = await fetch(CLOUDFLARE_TURNSTILE_URL, {
  //   body: formData,
  //   method: "POST",
  //  });

  //  const challengeResult = await result.json();

  //  const challengeSecceeded  =challengeResult.success;

  //  if(!challengeSecceeded && process.env.NODE_ENV === "production") {
  //   return NextResponse.json(
  //       {
  //           message: "Invalid reCAPTCHA token",
  //       },
  //       {
  //           status: 403,
  //       }
  //    );
  //  }

   const dbProblem = await dbCLient.problem.findUnique({
    where :{
        id: subbmissionInput.data.problemId,
     }
   });
   if(!dbProblem) {
    return NextResponse.json(
        {
            message: "Problem not Found",
        },
        {
            status: 401
        }
     ); 
   }
   const userExist = await dbCLient.user.findUnique({
     where: {
      id:userId,
     }
   })
   if (!userExist) { 
     return NextResponse.json(
      {
        message: "user does not exist"
      },
      {
        status: 401
      }
     )
   }

   const problem = await getProblem(
    dbProblem.slug,
    subbmissionInput.data.languageId,
   );

   if (!problem || !problem.inputs || !problem.outputs) {
    return NextResponse.json(
      { message: "Invalid problem configuration" },
      { status: 400 }
    );
  }

  // Prepare the submission code
  const fullCode = problem.fullBoilerplateCode.replace(
    "##USER_CODE_HERE##",
    subbmissionInput.data.code
  );

  try {
    // Validate code is not empty
    if (!subbmissionInput.data.code?.trim()) {
      return NextResponse.json(
        { message: "Code cannot be empty" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${JUDGE0_URI}/submissions/batch?base64_encoded=false`,
      {
        submissions: problem.inputs.map((input: string, index: number) => ({
          language_id: LANGUAGE_MAPPING[subbmissionInput.data.languageId]?.judge0,
          source_code: fullCode.replace(
            "##INPUT_FILE_INDEX##",
            index.toString()
          ),
          expected_output: problem.outputs[index],
          stdin: input,
          memory_limit: 256000, // 256MB
          cpu_time_limit: 2, // 2 seconds
          wall_time_limit: 5, // 5 seconds
          enable_network: false,
          compiler_options: "-O2", // Optimization level 2
          redirect_stderr_to_stdout: true,
        })),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        }
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid Judge0 response");
    }

    const submission = await dbCLient.submission.create({
      data: {
        userId: session.user.id,
        problemId: subbmissionInput.data.problemId,
        code: subbmissionInput.data.code,
        status: "PENDING",
        time: null,
        memory: null,
        testcases: {
          createMany: {
            data: response.data.map((testcase: any) => ({
              token: testcase.token,
              status_id: 1,
              time: null,
              memory: null,
              stdout: null,
              stderr: null
            }))
          }
        }
      },
      include: {
        testcases: true,
      },
    });

    return NextResponse.json(
      { id: submission.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Submission error:", error?.response?.data || error);
    return NextResponse.json(
      { 
        message: "Submission failed", 
        error: error?.response?.data?.message || error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
   const session = await getServerSession(authOptions);
   if(!session?.user) {
     return NextResponse.json(
      {
        message: "You must be logged in to view submissions"
      },
      {
        status: 401
      }
     );
   }
   const url = new URL(req.url);
   const searchParams = new URLSearchParams(url.search);
   const submissionId = searchParams.get("id");

   if(!submissionId) {
     return NextResponse.json(
      {
        message: "invalid submission id",
      },
       {
        status: 400,
       }
     );
   }
  try {
    let submission = await dbCLient.submission.findUnique({
      where: { id: submissionId },
      include: {
        testcases: {
          orderBy: { token: 'asc' }
        }
      },
    });

    if (!submission) {
      return NextResponse.json(
        { message: "Submission not found" },
        { status: 404 }
      );
    }

    // Check Judge0 status for pending testcases
    if (submission.status === "PENDING") {
      for (const testcase of submission.testcases) {
        try {
          const judge0Response = await axios.get(
            `${JUDGE0_URI}/submissions/${testcase.token}?base64_encoded=false&fields=stdout,stderr,status_id,time,memory,message,compile_output`,
            {
              headers: {
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
              }
            }
          );

          const result = judge0Response.data;
          if (!testcase.token) continue;
          await dbCLient.submissions.update({
            where: { token: testcase.token },
            data: {
              status_id: result.status?.id || testcase.status_id,
              stdout: result.stdout || null,
              stderr: result.stderr || null,
              message: result.message || result.compile_output || null,
              time: result.time ? parseFloat(result.time) : null,
              memory: result.memory || null
            }
          });
        } catch (error) {
          console.error(`Error updating testcase ${testcase.token}:`, error);
        }
      }

      // Refresh submission data
      submission = await dbCLient.submission.findUnique({
        where: { id: submissionId },
        include: { testcases: true },
      });
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { message: "Error processing submission" },
      { status: 500 }
    );
  }
}