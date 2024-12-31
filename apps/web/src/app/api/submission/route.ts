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

   problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
    "##USER_CODE_HERE##",
    subbmissionInput.data.code
   );
   const response = await axios.post(
    `${JUDGE0_URI}/submissions/batch?base64_encoded=false`,
    {
      submissions: problem.inputs.map((input: any, index: number) => ({
        language_id: LANGUAGE_MAPPING[subbmissionInput.data.languageId]?.judge0,
        source_code: problem.fullBoilerplateCode.replace(
          "##INPUT_FILE_INDEX##",
          index.toString()
        ),
        expected_output: problem.outputs[index],
        stdin: input
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
    return NextResponse.json(
      {
        message: "Invalid response from Judge0",
        error: response.data
      },
      { status: 500 }
    );
   }

   const submission = await dbCLient.submission.create({
    data: {
      userId: session.user.id,
      problemId: subbmissionInput.data.problemId,
      code: subbmissionInput.data.code,
      activeContestId: subbmissionInput.data.activeContestId,
      testcases: {
        createMany: {
          data: response.data.map((testcase: any) => ({
            token: testcase.token,
            status_id: 1 // Set initial status as queued
          }))
        }
      }
    },
    include: {
      testcases: true,
    },
   });
   console.log("submission made for submission ID" , userId);
   
   return NextResponse.json(
    {
      message: "Submission made",
      id: submission.id,
    },
    {
      status: 200,
    }
   )
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
  let submission = await dbCLient.submission.findUnique({
    where: {
      id: submissionId,
    },
    include: {
      testcases: true,
    },
  });
  if(!submission) {
    return NextResponse.json(
      {
        message: "Submission not found",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(
    {
      submission,
    },
    {
      status: 200,
    }
  );
}