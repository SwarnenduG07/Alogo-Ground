import { CheckIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import { sub } from "framer-motion/client";
interface ProblemRowProps {
    id: string;
    title: string;
    difficulty: string;
    submissionCount: number;
    contestId: string;
    points: number;
}
export const ContestProblemTable = ({contest}: {
    contest: {
        title: string;
        difficulty: string;
        id: string;
        problems: {
            problem :{
                id: string;
                title : string;
                difficulty: string;
                solved: number;
            };
        }[];
        contestSubmissions: {
            userId : string;
            problemId :string;
            contestId: string;
            proints: number;
        }[];
    };
}) => {
   return (
    <div className="flex flex-col"> 
     <main className="flex-1 py-8 md:py-12">
       <div className="container mx-auto">
            <section>
                <div className="flex itsms-center justify-center mb-6">
                    <h2>
                        {contest.title}
                    </h2>
                </div>
                <div className="bg-yellow-100 rounded-lg shadow-md">
                  < Table>
                     <TableHeader>
                        <TableRow>
                            <TableHead>Problem</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Solved</TableHead>
                            <TableHead>Your Status</TableHead>
                            <TableHead>Solve</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {contest.problems.map(({problem}) => (
                             <ProblemRow 
                                points={contest.contestSubmissions.find(
                                    (submission) => submission.problemId === problem.id
                                )?.proints || 0}
                                contestId={problem.id} 
                                id={problem.id}
                                 title={problem.title} 
                                 difficulty={problem.difficulty} 
                                 submissionCount={problem.solved}                            
                             />
                        ))}
                     </TableBody>
                  </Table>
                </div>
            </section>
       </div>
     </main>
    </div> 
   )
}

function ProblemRow({
    id,
    title,
    difficulty,
    submissionCount,
    contestId,
    points
}: ProblemRowProps) {
  return (
     <TableRow>
        <TableCell>
            <div className="flex items-center justify-between">
               <div className="text-md font-bold">{title}</div>
            </div>
        </TableCell>
        <TableCell>
             <div className="text-sm text-gray-500">
               <span className="font-medium"> {difficulty}</span>
             </div>
        </TableCell>
        <TableCell>
             <div className="text-sm text-gray-500">
               <span className="font-medium"> {difficulty}</span>
             </div>
        </TableCell>
        <TableCell>
             <div className="text-sm text-gray-500">
               <span className="font-medium"> {submissionCount}</span>
             </div>
        </TableCell>
        <TableCell>
             <div className="text-sm text-gray-500">
               <span className="font-medium"> {points? <CheckIcon className="h-4 w-4 text-green-400"/> : null}</span>
             </div>
        </TableCell>
        <TableCell>
             <Link href={`/contest/${contestId}/problem/${id}`}>
                <Button className="w-full">
                    Solve
                </Button>
             </Link>
        </TableCell>
     </TableRow>
  )
}