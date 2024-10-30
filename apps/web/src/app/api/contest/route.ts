import { authOptions } from "@/lib/auth.action";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbCLient } from "../../db";

export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
     const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      {
        message: "You must be an admin to create contests",
      },
      {
        status: 401,
      }
    );
  }

  const body = await req.json();
  const formschema = z.object({
      title: z
            .string({required_error: "Title is required"})
            .min(3, "Tite must be at least 3 characters long")
            .max(150, "Title must be at most 150 characters long"),
      description: z
              .string({required_error: "Description is required"})
              .min(10, "Description must be at least 10 characters long")
              .max(500, "Description must be at most 500 characters long"), 
      startTime: z.coerce.date({required_error: "Start date is required"}),
      endTime: z.coerce.date(),
      hidden: z.boolean().default(false),
      problem: z.array(z.string()),
  })

  const form = formschema.safeParse(body);
   if(!form.success) {
    return NextResponse.json(
      {
        message: "Invalid Input",
        errors: form.error,
      },
      {
        status: 400,
      }
     );
   };

   const validateData = form.data;
   const problems = await dbCLient.problem.findMany({
    where: {
      id: {
        in: validateData.problem,
      }
    }
   });

   if (problems.length !== validateData.problem.length) {
     return NextResponse.json(
      {
        message: "Invalid Problms"
      }, 
      {
        status: 400,
      }
     )
   }

   const contest = await dbCLient.$transaction(async(tx) => {
    const contest = await tx.contest.create({
      data: {
        title: validateData.title,
        description: validateData.description,
        startTime: validateData.startTime,
        endTime: validateData.endTime,
        hidden: validateData.hidden,
      },
    });
    await tx.contestProblem.createMany({
      data: [
        ...problems.map((problem, index) => ({
          contestId: contest.id,
          problemId: problem.id,
          index,
        })),
      ],
    });
    return contest;
   })
   return NextResponse.json({
    message: "Contest created successfully",
    contest,
   }, {status: 201})
}