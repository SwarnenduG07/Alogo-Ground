import ProblemStatement from "@/components/problemstatement";
import { ProblemSubmitBar } from "@/components/problemsubmitbar";
import { getProblem } from "@/src/app/db/problem";

export default async function ProblemPage({
    params: {problemId},
}: { 
    params: {
        problemId: string;
    }
}) {
     const problem = await getProblem(problemId);
     if(!problem) {
        return <div>Problem not Found</div>
     }

     return (
        <div className="flwx flex-col">
            <main className="flex-1 py-8 md:py-12 md:grid-cols-2 gap-8 md:gap-12 px-2">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                    <div className="prose prose-stone dark:prose-invert">
                        <ProblemStatement description={problem.description} />
                    </div>
                    <div>
                        <ProblemSubmitBar problem={problem}/>
                    </div>
                </div>
            </main>
        </div>
     )
}

// export const dynamic = "force-dynamic"