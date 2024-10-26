import { getServerSession } from "next-auth"
import { dbCLient } from ".";
import { authOptions } from "@/lib/auth.action";
import { Session } from "next-auth";

export const getContest = async (contestId: string) => {
    const session = await getServerSession(authOptions) as Session | null;
    const contest = await dbCLient.contest.findFirst({
        where: {
            id: contestId,
            hidden: false,
        },
        include: {
            problems: {
                include: {
                    problem: true,
                },
            },
            contestSubmissions: {
                 where: {
                    userId: (session?.user as { id: string })?.id
                 },
            },
        },
    });
    return contest;
};

export const getcontestWithLeaderboard = async () => {
    const contests = await dbCLient.contest.findMany({
        where: {
            leaderboard: true,
        },
    })
    return contests;
};

export const getUpcomingContests = async () => {
    const contests = await dbCLient.contest.findMany({
        where: {
            hidden: false,
            startTime: {
                gt: new Date(),
            },
        },
        orderBy: {
            startTime: "asc",
        },
    });
    return contests;
}

export const getRunningContests = async () => {
    const contests = await dbCLient.contest.findMany({
        where: {
            hidden: false,
            startTime: {
                lte: new Date(),
            },
            endTime: {
                gt: new Date(),
            },
        },
        orderBy: {
            startTime: "asc"
        },
    });
    return contests;
};

export const getExixtingContests = async () => {
    const contests = await dbCLient.contest.findMany({
        where: {
            hidden: false,
            endTime: {
                lt: new Date(),
            },
        },
        orderBy: {
            startTime: "asc"
        },
    });
    return contests;
};

