const fs = require("fs");
var { compileToPython } = require("./compilers/python/compilePython");

async function compile(file) {
  try {
    let fileContent = fs.readFileSync(file);
    fileContent = fileContent.toString();
    fs.writeFile("output.py", compileToPython(fileContent));
  } catch (error) {
    throw new Error("Compiler ran into an error: " + error);
  }
}

module.exports.compile = compile;
