"use client"
import  { Editor } from "@monaco-editor/react"
import {  useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import axios from "axios";
import { ISubmission, SubmissionTable } from "./submissionTable";
import { Turnstile } from "@marsidev/react-turnstile" 
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { submissions as SubmissionsType } from "@repo/db/client";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { CircleX, ClockIcon } from "lucide-react";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
  "0x4AAAAAAAc4qhUEsytXspC_";
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
enum SubmitStatus {
  SUBMIT = "SUBMIT",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  FAILED = "FAILED"
}

export const ProblemSubmitBar = ({problem, contestId}: {
    problem: Iproblem,
    contestId?: string,
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
               <SubmitProblem problem={problem}
               contestId={contestId}/>
            </div>
            {activeTab === "submissions" && <Submissions problem={problem}/>}
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
      <SubmissionTable submissions={submissions} />
    </div>
  );
}

function SubmitProblem ({
  problem,
  contestId,
}: {
  problem: Iproblem;
  contestId?:string;
}) {
     const [language, setLangage] = useState(
       Object.keys(LANGUAGE_MAPPING)[0] as string
     )

     const [code, setCode] = useState<Record<string, string>>({})
     const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT);
     const [testcases, setTestcases] = useState<any[]>([]);
     const [token, setToken] = useState<string>("");
     const session = useSession();

     useEffect(() => {
      const defaultCode: { [key: string]: string } = {};
      problem.defaultCode.forEach((code) => {
        const language = Object.keys(LANGUAGE_MAPPING).find(
          (language) => LANGUAGE_MAPPING[language]?.internal === code.languageId
        );
        if (!language) return;
        defaultCode[language] = code.code;
      });
      setCode(defaultCode);
    }, [problem.id]);

     async function pollwithBackOff(id: string, retries: number) {
          if (retries === 0) {
            setStatus(SubmitStatus.SUBMIT);
            toast.error("Not able to get Status");
            return;
          }
          const response = await axios.get(`/api/submission/?id=${id}`);

          console.log(response.data.submission);
          if(response.data.submission.status === "PENDING") {
            setTestcases(response.data.submission.testcases);
            await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000));
            pollwithBackOff(id, retries -1);
          } else {
            if(response.data.submission.status === "AC") {
              setStatus(SubmitStatus.ACCEPTED);
              setTestcases(response.data.submission.testcases);
              toast.success("Accepted!");
              return;
            } else {
              setStatus(SubmitStatus.FAILED)
              toast.error("Failed: (");
              setTestcases(response.data.submission.testcases);
              return;
            }
          }
       }
     
    async function submit() {
       setStatus(SubmitStatus.SUBMIT);
       setTestcases((t) => t.map((tc) => ({ ...tc, status:"PENDING"})));
       try {
         const response = await axios.post(`/api/submission/`, {
          code: code[language],
          languageId: language,
          problemId: problem.id,
          activeContestId: contestId,
          token :token,
         });
         pollwithBackOff(response.data.id, 10);
       } catch (e) {
        //@ts-ignore
        toast.error(e.response.statusText);
          setStatus(SubmitStatus.SUBMIT);
          
          
       }
       
    }    
    return (
      <div>
           <Label htmlFor="language">Language</Label>
           <Select
           value={language}
           defaultValue="cpp"
           onValueChange={(value) => setLangage(value)}
           >
            <SelectTrigger>
              <SelectValue placeholder="Select langauge" />
            </SelectTrigger>
              <SelectContent>
                {Object.keys(LANGUAGE_MAPPING).map((language) => (
                  <SelectItem key={language} value={language}>
                      {LANGUAGE_MAPPING[language].name}
                  </SelectItem>
                ))}
              </SelectContent>
           </Select>
           <div className="pt-3 rounded-md">
               <Editor 
               height={"60vh"}
               value={code[language]}
               theme="vs-dark"
               onMount={() => {}}
               options={{
                fontSize: 14,
                scrollBeyondLastLine: false,
               }}
               language={LANGUAGE_MAPPING[language]?.monaco}
               onChange={(value) => {
                //@ts-ignore
                setCode({...code, [language]: value})
               }}
               defaultLanguage="javascript"
               />
           </div>
           <div className="flex justify-end">
                {/* {process.env.NODE_ENV === "production" ? (
                  <Turnstile 
                  onSuccess={(token: string) => {
                    setToken(token);
                  }} 
                  siteKey={TURNSTILE_SITE_KEY}
                  />
                ): null} */}
                <Button 
                disabled={status === SubmitStatus.PENDING}
                type="submit"
                className="mt-4 align-right"
                onClick={session.data?.user ? submit : () => signIn()}
                >
                  {session.data?.user ? status === SubmitStatus.PENDING ? "submitting" : "submit" : "Login to submit"}
                </Button>
           </div>
                <RenderTestCase testcases={testcases}/>
        </div>
    )
}

function renderResult(status :number | null) {
  switch (status) {
    case 1: 
       return <ClockIcon className="h-6 w-6 text-yellow-400"/>;
    case 2: 
       return <ClockIcon className="h-6 w-6 text-yellow-400"/>;
    case 3: 
       return <ClockIcon className="h-6 w-6 text-green-500"/>;
    case 4: 
       return <CircleX className="h-6 w-6 text-yellow-400"/>;
    case 5: 
       return <ClockIcon className="h-6 w-6 text-yellow-400"/>;
    case 6: 
       return <CircleX className="h-6 w-6 text-yellow-400"/>;
    case 13: 
       return <div className=" text-gray-500">Inter Error!</div>;
    case 14: 
         return <div className=" text-gray-500">Exac Fromat Error!</div>;
     default: 
         return <div className=" text-gray-500">Runtime Error!</div>;
    
  }
}

function RenderTestCase({testcases} :{
  testcases :SubmissionsType[];
}) {
    return (
      <div className="grid gird-cols-6 gap-4">
       {testcases.map((testcases, index) => (
        <div key={index} className="broder rounded-md">
           <div className="px-2 pt-2 flex justify-center">
              <div className="">
                Test #{index + 1}
              </div>
           </div>
           <div className="p-2 flex justify-center">
              {renderResult(testcases.status_id)}
           </div>
        </div>
       ))}
      </div>
    )
}

