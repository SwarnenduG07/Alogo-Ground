import { authOptions } from "@/lib/auth.action";
import { dbCLient } from "@/src/app/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
     const session = await getServerSession(authOptions);
     if(!session?.user) {
        return NextResponse.json(
            {
                messsage: "you must ahve login to view submission"
            },
             {
                status: 401,
             }
        );
     }
     const url = new URL(req.url);

     const searchParams = new URLSearchParams(url.search);
     const problemId = searchParams.get("problemId");
     if(!problemId) {
        return NextResponse.json(
            {
                message: "Invalid problem Id"
            },
            {
                status: 400,
            }
        );
     }
     const submission = await dbCLient.submission.findMany({
         where: {
            problemId: problemId,
            userId: session.user.id,
         },
         take: 10,
         include: {
            testcases: true,
         }, 
         orderBy :{
            createdAt: "desc"
         },
     });
     return NextResponse.json(
        {
            submission,
        },
        {
            status :200
        }
     )
}