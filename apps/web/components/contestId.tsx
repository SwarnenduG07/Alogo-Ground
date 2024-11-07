import { getContest } from "@/src/app/db/contest";
import { ContestProblemTable } from "./contestproblem-id";
import ContestClock from "./contest-clock";
import ContestPoints from "./contest-points";

export async function ContestId({ id }: { id: string }) {
  const contest = await getContest(id);

  if (!contest) {
    return <div>Contest not found</div>;
  }

  return (
    <div className="grid grid-flow-row-dense gap-4 grid-cols md:grid-cols-12 grid-cols-1 min-h-screen px-2 md:px-12 ">
      <div className="col-span-9 ">
        <ContestProblemTable contest={contest} />
      </div>
      <div className="col-span-3">
        <div className="col-span-3 pt-2 md:pt-24">
          <ContestClock endTime={contest.endTime} />
        </div>
        <div className="pt-2">
          <ContestPoints
            points={contest.contestSubmissions.reduce(
              (acc, curr) => acc + curr.points,
              0
            )}
          />
        </div>
      </div>
    </div>
  );
}
