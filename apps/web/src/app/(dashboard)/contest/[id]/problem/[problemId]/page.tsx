"use client"
import ProblemStatement from "@/components/problemstatement";
import { ProblemSubmitBar } from "@/components/problemsubmitbar";
import { getProblem } from "@/src/app/db/problem";

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
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <div className="prose prose-stone dark:prose-invert">
            <ProblemStatement description={problem.description} />
          </div>
        </div>
        <ProblemSubmitBar contestId={id} problem={problem} />
      </main>
    </div>
   )
}