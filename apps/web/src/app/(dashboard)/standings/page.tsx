"use client"
import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getcontestWithLeaderboard } from "../../db/contest";

// Define the Contest interface
interface Contest {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    hidden: boolean;
    endTime: Date;
    createdAt: Date;
    leaderboard: boolean;
    updatedAt: Date;
}

export default function Page() {
    const [contests, setContests] = useState<Contest[]>([]);

    useEffect(() => {
        const fetchContests = async () => {
            const data = await getcontestWithLeaderboard();
            setContests([...data]);
        };
        fetchContests();
    }, []);

    return (
        <div>
            <div className="flex flex-col p-4 max-w-screen-md mx-auto">
                <div className="container px-4 md:px-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out the leaderboard
                        </p>
                    </div>
                </div>
                <div>
                    <ContestsTable contests={contests} />
                </div>
            </div>
        </div>
    );
}

function ContestsTable({ contests }: { contests: Contest[] }) {
    const router = useRouter();
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Contest Name</TableHead>
                        <TableHead>Start time</TableHead>
                        <TableHead>Result</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contests.map((contest) => (
                        <TableRow key={contest.id}>
                            <TableCell>{contest.id.substr(0, 8)}</TableCell>
                            <TableCell>{contest.title}</TableCell>
                            <TableCell>{contest.startTime.toLocaleString()}</TableCell>
                            <TableCell>
                                <Button 
                                    onClick={() => {
                                        router.push(`/standings/${contest.id}`);
                                    }}>
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
