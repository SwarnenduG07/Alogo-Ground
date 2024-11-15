export class ProblemDefinaionParser {
    problemName: string = "";
    functionName: string = "";
    inputFields: {type: string, name: string}[]= [];
    outputFields: {type: string, name: string}[]= [];


    parse(input: string): void {
        const lines = input.split("\n").map((line) => line.trim());
        let currentSection: string | null = null;

        lines.forEach((lines) => {
            if(lines.startsWith("Problem Name:")) {
                this.problemName = this.extractQuotedValue(lines)
            } else if (lines.startsWith("Function Name:")) {
                this.functionName = this.extraValue(lines)
            } else if(lines.startsWith("Input Structure")) {
                currentSection = "input"
            } else if (lines.startsWith("Output Structure :")) {
              currentSection = "output"
            } else if(lines.startsWith("Input Field:"))  {
              if(currentSection = "input") {
                const field = this.extractField(lines)
                if(field) this.inputFields.push(field)
              }
            } else if(lines.startsWith("Output Field:")) {
                if(currentSection === "output") {
                    const field = this.extractField(lines)
                    if(field) this.outputFields.push(field)
                }
            }
        });
     }
     extractQuotedValue(line: string): string {
        const match = line.match(/: "(.*)" &/);
        return match ? match[1] : "";
     }
     extraValue(line: string): string {
        const match = line.match(/: (\w+)$/);
        return match ? match[1] : ""
     }

     extractField(line: string): {type: string, name: string,} | null {
        const match = line.match(/Field: (\w+(?:<\w+>)?) (\w+)$/);
        return match? {type: match[1], name: match[2]}: null;
     }

     generateCpp(): string {
        const inputs = this.inputFields.map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
        .join(" , ");

        const inputReads = this.inputFields.map((field, index) => {
            if (field.type.startsWith("list<")) {
                return `int size_${field.name};\n  std::istringstream(lines[${index}]) >> size_${field.name};\n  ${this.mapTypeToCpp(field.type)} ${field.name}(size_${field.name});\n  if(!size_${field.name}==0) {\n  \tstd::istringstream iss(lines[${index + 1}]);\n  \tfor (int i=0; i < size_arr; i++) iss >> arr[i];\n  }`;
              } else {
                return `${this.mapTypeToCpp(field.type)} ${field.name};\n  std::istringstream(lines[${index}]) >> ${field.name};`;
              }
        })
        .join("\n ");
        const outputType = this.outputFields[0].type;
        const functioncall = `${outputType} result = ${this.functionName}(${
            this.inputFields.map((field) => field.name).join(",")
        });`;
        const outputWrite = `std::count << result << std::endl;`;

        return `#include <iostrem>
        #include <fstream>
        #include <vector>
        #include <string>
        #include <sstream>
        #include <climits>
        ##USER_CODE_HERE##
        int main() {
  std::ifstream file("/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt");
  std::vector<std::string> lines;
  std::string line;
  while (std::getline(file, line)) lines.push_back(line);

  file.close();
  ${inputReads}
  ${functioncall}
  ${outputWrite}
  return 0;
    }`;
 }
     generatejava() : string {

     }

     generateRust(): string {

     }
     generateJs() :string {

     }


     mapTypeToCpp(type: string): string {
        switch(type) {
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "string";
            case "bool":
                return "bool";
            case "list<int>": 
                 return "std::vector<int>"
            case "list<float>":
                return "std::vector<float>"
            case "list<string>":
                return "std::vector<string>"
            case "list<bool>":
                return "std::vector<bool>"
            default:
                return "unknown"
        }
      }
}  