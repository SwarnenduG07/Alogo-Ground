import { z } from "zod";

export const SubbmissionInput = z.object({
    code: z.string(),
    languageeId: z.enum(["js", "cpp", "rs", "java"]),
    problemId: z.string(),
    activeContestId: z.string().optional(),
    token: z.string(),
});