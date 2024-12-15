"use client";

import { Table } from "lucide-react";
import { useSession } from "next-auth/react";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

export function ContestPointsTable({
  contestPoints,
}: {
  contestPoints: any[];
}) {
  const session = useSession();

  function getClassName(contestPoint: any) {
    // @ts-ignore
    return `${session.data?.user.id === contestPoint.user.id ? "text-extrabold text-green-500" : "text-gray-500"}`;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contestPoints.map((contestPoint) => (
          <TableRow key={contestPoint.user.id}>
            <TableCell className={getClassName(contestPoint)}>
              {contestPoint.rank}
            </TableCell>
            <TableCell className={getClassName(contestPoint)}>
              {contestPoint.user.name}
            </TableCell>
            <TableCell className={getClassName(contestPoint)}>
              {contestPoint.points}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
