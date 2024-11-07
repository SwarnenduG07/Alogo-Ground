import { getProblem } from "@/src/app/db/problem";
import { div, i } from "framer-motion/client";
import { get } from "http";
import { ReceiptRussianRuble } from "lucide-react";

export default async function ProblemPage({params: {id, problemId},}: {
    params: {id: string;
         problemId: string;
};
}) {
    const problem = await getProblem(problemId, id);

    if(!problem) {
        return <div>No Problem found</div>;
    }
    return (
        <div>
            
        </div>
    )
}