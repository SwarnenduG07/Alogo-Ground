import { authOptions } from "@/lib/auth.action";
import { dbCLient } from "@/src/app/db";
import { Cone } from "lucide-react";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { fromTheme } from "tailwind-merge";
import z from "zod"

export async function POST(req: NextRequest, {params}: { params: {id: string}})  {
      const session = await getServerSession(authOptions);
      if(!session || session.user.role !== "ADMIN") {
         return NextResponse.json(
            {
                message: "You must be an Admin to create contest"
            },
            {
                status: 401,
            }
         );
      }
      const body = await req.body;
      const id = params.id;

      const fromschema = z.object ({
        title: z
               .string({required_error: "Title is required"})
               .min(3,"Title should be at least 3 character long")
               .max(100,"Title can not extand 100 character"),
        description: z
               .string({required_error: "Description is required"})
               .min(10, "Discription must be at least 10 character long")
               .max(500, "Description can not extand 500 characters"),
        startTime: z.coerce.date(),   
        endTime: z.coerce.date(),
        hidden: z.boolean().default(false),
        problems: z.array(z.string()),              
      });
      const from =fromschema.safeParse(body);
      if(!from.success) {
        console.log(from.error);
        return NextResponse.json(
            {
                message :"Invalid Input",
                errors: from.error,
            },
            {
                status : 400,
            }
        );
        
      }
      const validationData = from.data;
      const problems = await dbCLient.problem.findMany({
        where: {
            id: {
                in: validationData.problems,
            }
        }
      });
      if(problems.length !== validationData.problems.length) {
        return NextResponse.json(
            {
                message :"Invalid problem",
            },
            {
                status: 400,
            }
        );
      }
      const contest = await dbCLient.$transaction(async(tx) => {
        const contest = await tx.contest.update({
            where: {
                id,
            },
            data: {
                title: validationData.title,
                description: validationData.description,
                startTime: validationData.startTime,
                endTime: validationData.endTime,
                hidden : validationData.hidden,
            },
        });
        const precontestProblems = await tx.contestProblem.findMany({
            where:{
                contestId: id
            },
        });
        const precontestProblemIds = precontestProblems.map(
            (problems) => problems.problemId
        );
        const newProblems = problems.filter(
            (problems) => !precontestProblemIds.includes(problems.id)
        );
        const removedProblems = precontestProblems.filter(
            (problems) => !validationData.problems.includes(problems.problemId)
        );

        await tx.contestProblem.deleteMany({
            where: {
                contestId :id,
                problemId: {
                    in: removedProblems.map((problem) => problem.problemId),
                },
            },
        });
        await tx.contestProblem.createMany({
            data: {
                ...newProblems.map((problem, index) => ({
                    problemId: problem.id,
                    contestId: id,
                    index,
                })),
            },
        });
        return contest;
      });
      return NextResponse.json({contest}, {status: 201})
}