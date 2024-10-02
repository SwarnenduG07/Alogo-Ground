import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;

}

export const pirsma =  global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = pirsma;

export * from "@prisma/client";