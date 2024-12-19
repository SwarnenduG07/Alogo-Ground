import { LANGUAGE_MAPPING } from "@repo/common/language";
import fs from "fs";
import prisma from "../src";

const MOUNT_PATH = process.env.MOUNT_PATH ?? "../../apps/problems";
function promisifedReadFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function main(problemSlug: string, problemTitle: string) {
  const problemStatement = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/Problem.md`
  );

  const problem = await prisma.problem.upsert({
    where: {
      slug: problemSlug,
    },
    create: {
      title: problemSlug,
      slug: problemSlug,
      description: problemStatement,
      hidden: false,
    },
    update: {
      description: problemStatement,
    },
  });

  await Promise.all(
    Object.keys(LANGUAGE_MAPPING).map(async (language) => {
      const code = await promisifedReadFile(
        `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
      );
      await prisma.defaultCode.upsert({
        where: {
          problemId_languageId: {
            problemId: problem.id,
            languageId: LANGUAGE_MAPPING[language].internal,
          },
        },
        create: {
          problemId: problem.id,
          languageId: LANGUAGE_MAPPING[language].internal,
          code,
        },
        update: {
          code,
        },
      });
      console.log("Default codepushed for", problemSlug);
      
    })
  );
}

export async function addProblemsInDB() {
  try {
    const dirs = await new Promise<string[]>((resolve, reject) => {
      fs.readdir(MOUNT_PATH, (err, dirs) => {
        if (err) reject(err);
        else resolve(dirs.filter(dir => !dir.startsWith('.')));  // Filter hidden files
      });
    });

    console.log(`Found ${dirs.length} problems to process in ${MOUNT_PATH}`);
    
    for (const dir of dirs) {
      try {
        console.log(`Processing problem: ${dir}`);
        await main(dir, dir);
        console.log(`Successfully processed problem: ${dir}`);
      } catch (error) {
        console.error(`Error processing problem ${dir}:`, error);
      }
    }
  } catch (error) {
    console.error("Error reading problems directory:", error);
    throw error;
  }
}

// At the bottom of the file
if (require.main === module) {
  addProblemsInDB()
    .then(() => {
      console.log("Finished processing problems");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1); 
    });
}
