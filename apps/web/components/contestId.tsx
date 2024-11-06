import { getContest } from "@/src/app/db/contest";
import { div } from "framer-motion/client";

export async function ContestId({id}: {id: string}) {
    const contest = await getContest(id);

if(!contest) {
    return <div>No OCntest Found</div>;
}

return (
  <div className="">

  </div>
);
}