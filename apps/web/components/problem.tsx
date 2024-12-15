import { getProblems } from "@/src/app/db/problem";
import { ProblemSearch } from "./problem-client";
import Link from "next/link";

export async function Problems({ query }: {query: string | null}) {
  const problems = await getProblems(query ? query: undefined);
  
  return (
    <section className="px-8 md:py-22">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Problems
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Sharpen your skill with Diverse chalenges
          </p>
        </div>
        <ProblemSearch 
          query={query} 
          onSearch={(newQuery) => {
            window.location.href = `/problems?query=${newQuery}`;
          }}
        />
        <div className="mt-6">
          <div className="border-2 rounded-md  overflow-hidden dark:bg-background">
            <div className="flex bg-muted font-bold">
              <div className="px-2 py-2 flex-1">Name</div>
              <div className="mr-[465px] py-2 w-[100px]">Difficulty</div>
              <div className="pr-20 py-2 text-center w-[100px]">Status</div>
            </div>
            {problems.map((problems) => (
              <Link
                href={`/problem/${problems.id}`}
                className="flex text-muted-foreground hover:bg-muted/50 duration-300"
                key={problems.id}
              >
                <div className="px-2 py-2 flex-1 font-medium  capitalize">
                  {problems.title.split("-").join(" ")}
                </div>
                <div className="mr-[465px] py-2  w-[100px] capitalize">
                  {problems.difficulty.toLocaleLowerCase()}
                </div>
                <div className="px-5 py-2 flex text-center w-[100px]">-</div>
              </Link>
            ))}
          </div>
        </div>
        {problems.length === 0 && (
          <div className="flex flex-col items-center md:mt-12">
            <h1 className="lg:text-4xl md:text-2xl text-lg text-muted-foreground font-bold">
              No problems found{" "}
            </h1>
            {query && (
              <p className="text-muted-foreground dark:text-gray-400 mt-2">
                Try searching for another problem
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}