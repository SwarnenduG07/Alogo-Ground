import ProblemStatement from "@/components/problemstatement";
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
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="prose prose-stone dark:prose-invert">
                    <ProblemStatement  description={problem.description}/>
                </div>
            </main>
        </div>
   )
}