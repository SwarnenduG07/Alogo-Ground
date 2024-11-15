import fs from "fs";
import path from "path";
import { FullProblemDefinaionParser } from "./ProblemDefinitionGenerator";
import { log } from "console";

function generatePartialBoilarplate(generatorFilePath : string) {
  const inputFilePath = path.join(generatorFilePath, "Structured.md");
  const boilarplatePath = path.join(
    generatorFilePath,
    "boilerplate"
  );

  const input = fs.readFileSync(inputFilePath, "utf8");

  const parser = new FullProblemDefinaionParser();
  parser.parse(input);

  const cppCode = parser.generateCpp();
  const jsCode =parser.generateJs();
  const rsCode = parser.generateRust();
  const javaCode = parser.generateJava();

  if(!fs.existsSync(boilarplatePath)) {
    fs.mkdirSync(boilarplatePath, {recursive: true});
  }

  fs.writeFileSync(path.join(boilarplatePath, "function.cpp"), cppCode);
  fs.writeFileSync(path.join(boilarplatePath, "function.js"), jsCode);
  fs.writeFileSync(path.join(boilarplatePath, "function.rs"), rsCode);
  fs.writeFileSync(path.join(boilarplatePath, "function.java"), javaCode);

  console.log("Boilerplate code generated succeccfully");

  function generateFullBoilarPlate(generatorFilePath : string) {
    const inputFilepath = path.join(generatorFilePath, "Structure.md");
    const boilerplatePath = path.join(
        generatorFilePath,
        "boilerplate-full",
    );
    const input = fs.readFileSync(inputFilePath, "utf-8");

    const parser = new FullProblemDefinaionParser();
    parser.parse(input);

    const cppCode =parser.generateCpp();
    const jsCode = parser.generateJs();
    const rsCode = parser.generateRust();
    const javaCode = parser.generateJava();

    if(!fs.existsSync(boilarplatePath)) {
        fs.mkdirSync(boilerplatePath, {recursive: true});
    }
    fs.writeFileSync(path.join(boilarplatePath, "function.cpp"), cppCode);
    fs.writeFileSync(path.join(boilarplatePath, "function.js"), jsCode);
    fs.writeFileSync(path.join(boilarplatePath, "function.rs"), rsCode);
    fs.writeFileSync(path.join(boilarplatePath, "function.java"), javaCode);

    console.log("Boilarplate FullCode generated SucessFully");
  }

  const getFolders = (dir: string) => {
     return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if(err) {
                return reject(err);
            }
            const folder: string[] = [];
            let pending = files.length;

            if(!pending) return resolve(folder);

            files.forEach(file => {
                const filePath = path.join(dir, file);
                fs.stat(filePath, (err, stat) => {
                    if(err) {
                        return reject(err);
                    }
                    if(stat.isDirectory()) {
                        folder.push(file);
                    }
                    if(!--pending) {
                        resolve(folder);
                    }
                });
            });
        });
     });
  };
  function main() {
    fs.readdir(process.env.PROBLEMS_DIR_PATH || "" , (err, files) => {
        files.forEach(file => {
            if(file) generatePartialBoilarplate(path.join(process.env.PROBLEMS_DIR_PATH || "", file));
        })
    }) 
  }
  if(!process.env.PROBLEMS_DIR_PATH) {
    console.log("Store a valid dir path in .env", process.env.PROBLEMS_DIR_PATH);
  } else {
    getFolders(process.env.PROBLEMS_DIR_PATH).then((folders: any) => {
        folders.forEach((folder: string) => {
          generatePartialBoilarplate(path.join(process.env.PROBLEMS_DIR_PATH || "", folder));
          generateFullBoilarPlate(path.join(process.env.PROBLEMS_DIR_PATH || "", folder));
        });
      })
    }
}