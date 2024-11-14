import { authOptions } from "@/lib/auth.action";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { SubbmissionInput } from "@repo/common/zod";
import { fromTheme } from "tailwind-merge";
import { dbCLient } from "../../db";

import { sub } from "framer-motion/client";
import { getProblem } from "@/lib/problems";

const SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!;

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
            message: "Invalid Input"
        },
        {
            status: 400,
        }
     );
   }

   let formData = new FormData();
   formData.append("secret", SECRET_KEY); 
   formData.append("response", subbmissionInput.data.token);

   const result = await fetch(CLOUDFLARE_TURNSTILE_URL, {
    body: formData,
    method: "POST",
   });

   const challengeResult = await result.json();

   const challengeSecceeded  =challengeResult.success;

   if(!challengeSecceeded && process.env.NODE_ENV === "production") {
    return NextResponse.json(
        {
            message: "Invalid reCAPTCHA token",
        },
        {
            status: 403,
        }
     );
   }

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
            status :404
        }
     ); 
   }

   const problem = await getProblem(
    dbProblem.slug,
    subbmissionInput.data.languageeId,
   );
}