import { getProblems } from "@/src/app/db/problem";

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
                <div>
                    <form action="">
                        
                    </form>
                </div>
            </div>
        </section>
     )
}