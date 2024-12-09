import { dbCLient } from "."
import { Problem } from "@repo/db/client";

export const getProblem = async (problemId: string, contestId?:string) => {
     if(contestId) {
        const contest = await dbCLient.contest.findFirst({
            where: {
                id: contestId,
                hidden: false,
            }
        });
        if(!contest) {
            return null;
        }

        const problem = await dbCLient.problem.findFirst({
            where:{
                id: problemId,
                Contest: {
                    some: {
                        contestId: contestId,
                    },
                },
            },
            include:{
                defaultCode: true,
            },
        });
        return problem;
     }
     const problem = await dbCLient.problem.findFirst({
        where: {
            id: problemId,
        },
        include: {
            defaultCode: true,
        },
     });
     return problem
};

export const getProblems = async (query?: string): Promise<Problem[]> => {
    const problems = await dbCLient.problem.findMany({
      where: {
        hidden: false,
        ...(query && {
          title: {
            contains: query,
            mode: "insensitive",
          },
        }),
      },
      include: {
        defaultCode: true,
      },
    });
    return problems;
  };