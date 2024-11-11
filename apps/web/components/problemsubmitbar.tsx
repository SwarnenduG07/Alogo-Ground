import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import axios from "axios";
import { ISubmission } from "./submissionTable";
interface Iproblem {
    id: string;
    title :string;
    description :string;
    slug: string;
    defaultCode: {
        languageId : number;
        code: string;
    }[];
}

export const ProblemSubmitBar = ({problem, contestId}: {
    problem: Iproblem,
    contestId: string,
}) => {

    const [activeTab , setActiveTab] = useState("problem");
    return (
        <div className="bg-white dark:bg-gray-900 rounde-lg shadow-md p-6">
          <div className="gird gap-4">
            <div className="grid gird-cols-2 gap-4">
               <div>
                 <Tabs
                 defaultValue="problem"
                 className="rounded-md p-1"
                 value={activeTab}
                 onValueChange={setActiveTab}
                 >
                    <TabsList className="gird grid-cols-2 w-full">
                        <TabsTrigger value="problem">Problem</TabsTrigger>
                        <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    </TabsList>
                 </Tabs>
               </div>
            </div>
            <div className={`${activeTab === "problem" ? "" : "hidden"}`}>
               {/* TODO ADD  Submitproblem */}
            </div>
          </div>
        </div>
    )
}
function Submissions({ problem }: { problem: Iproblem }) {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/submission/bulk?problemId=${problem.id}`
      );
      setSubmissions(response.data.submissions || []);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <SubmissionTable submissions={submissions} /> */}
    </div>
  );
}