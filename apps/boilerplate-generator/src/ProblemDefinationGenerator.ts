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
        let inputReadindex = 0;
        const inputReadess = this.inputFields.map((fields) => {
            if(fields.type.startsWith("list<")) {
                let javaType = this.mapTypeToJava(fields.type);
                let inputeType = javaType.match(/<(.*?)>/);
                javaType = inputeType ? inputeType[1] : 'Integer';
                let parseToType = (javaType === 'Integer') ? 'Int' : javaType;

                return `int size_${fields.name} = Integer.parseInt(lines.get(${inputReadindex++}).trim());\n
                ${this.mapTypeToJava(fields.type)} ${fields.name} = new ArrayList<>(size_${fields.name});\n
                String[] inputStream = lines.get(${inputReadindex++}).trim().split("\\s+");\n
                for (String inputChar : inputStream)  {\n
                  ${fields.name}.add(${javaType}.parse${parseToType}(inputChar));\n
                }\n`;
            } else {
                let javaType = this.mapTypeToJava(fields.type);
                if(javaType === "int") {
                    javaType = 'Integer';
                } else if (javaType === 'float') {
                    javaType = "Float";
                } else if (javaType === 'boolean') {
                    javaType = "Boolean";
                } else if (javaType === 'string') {
                    javaType = "String";
                }
                let parseToType = (javaType === "Integer") ? "Int" : javaType;return `${this.mapTypeToJava(fields.type)} ${fields.name} = ${javaType}.parse${parseToType}(lines.get(${inputReadindex++}). trim());`;
            }
        }).join("\n ");
        const outputType = this.mapTypeToJava(this.outputFields[0].type);
        const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((fields) => fields.name).join(", ")});`;
        const outputWrite = `System.out.println(result);`;
    return `
    import java.io.*;
    import java.util.*;

    public class Main {
        
        ##USER_CODE_HERE##

    public static void main(String[] args) {
        String filePath = "/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt"; 
        List<String> lines = readLinesFromFile(filePath);
        ${inputReadess}
        ${functionCall}
        ${outputWrite}
    }
    public static List<String> readLinesFromFile(String filePath) {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }
   }`
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
      mapTypeToJava(type:string):string {
        switch (type) {
          case "int":
            return "int";
          case "float":
            return "float";
          case "string":
            return "String";
          case "bool":
            return "boolean";
          case "list<int>":
            return "List<Integer>";
          case "list<float>":
            return "List<Float>";
          case "list<string>":
            return "List<String>";
          case "list<bool>":
            return "List<Boolean>";
          default:
            return "unknown";
        }
      }
      mapTypeToRust(type: string): string {
        switch (type) {
          case "int":
            return "i32";
          case "float":
            return "f64";
          case "string":
            return "String";
          case "bool":
            return "bool";
          case "list<int>":
            return "Vec<i32>";
          case "list<float>":
            return "Vec<f64>";
          case "list<string>":
            return "Vec<String>";
          case "list<bool>":
            return "Vec<bool>";
          default:
            return "unknown";
        }
      }

}  