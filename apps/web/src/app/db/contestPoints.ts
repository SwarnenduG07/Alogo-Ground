import { authOptions } from "@/lib/auth.action"
import { getServerSession } from "next-auth"
import { dbCLient } from ".";

export const getContestPoints = async (contestId: string, page: number, perPage: number) => {
    const session = await getServerSession(authOptions);

    const contestPoints = await dbCLient.contestPoints.findMany({
        where: {
            contestId: contestId,
        },
        take:perPage,
        skip: perPage * (page -1),
        orderBy: {
            rank: "asc",
        },
        select: {
            rank: true,
            points: true,
            user: {
                select: {
                    username: true,
                    id: true,
                }
            }
        }
    });

    const myPoints = await dbCLient.contestPoints.findFirst({
        where: {
            contestId: contestId,
            userId: session?.user.id ?? "-1"
        },
    });
    return { contestPoints, myPoints };
}