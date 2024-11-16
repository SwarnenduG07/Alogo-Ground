import { data } from "framer-motion/client";
import fs from "fs";
type SUPPORTED_LANGS = "js" | "cpp" | "rs" | "java";
interface Problem {
    id: string;
    fullBoilerplateCode: string;
    inputs: string[];
    outputs: string[];
}

const MOUNT_PATH = process.env.MOUNT_PATH ?? "/home/ubuntu/algorithmic-arena/apps/problems"

export const getProblem = async (
    problemId: string,
    languageId: SUPPORTED_LANGS,
  ): Promise<Problem> => {
  const fullboilerplateCode = await getProblemFullBoilerplateCode(
    problemId,
    languageId,
  );

  const inputs = await getProblemInputs(problemId);
  const outputs = await getProblemOutputs(problemId);

  return {
    id: problemId,
    fullBoilerplateCode: fullboilerplateCode,
    inputs: inputs,
    outputs: outputs,
  };
};

async function getProblemFullBoilerplateCode (
    problemId: string,
    languageId: SUPPORTED_LANGS): Promise<string> {
    
        return new Promise((resolve, reject) => {
            fs.readFile(
                `${MOUNT_PATH}/${problemId}/boilerplate-full/function.${languageId}`,
                {encoding: "utf-8"},
                (err, data) => {
                    if(err) {
                        reject(err);
                  }
                 resolve(data);
           },
        );
    });
}

async function getProblemInputs (problemId: string): Promise<string[]> {
 return new Promise((resolve, reject) => {

 })
}
async function getProblemOutputs (problemId:string): Promise<string[]> {
    return new Promise((resolve, reject) => {
    
    })
}