const fs = require("fs");
var { compileToPython } = require("./compilers/python/compilePython");

async function compile(file) {
  try {
    let fileContent = fs.readFileSync(file, "utf-8", (err, data) => {
      if (err) console.log("\x1b[31m%s\x1b[0m", error);
    });
    fileContent = fileContent.toString();
    fs.writeFile(
      "output.py",
      await compileToPython(fileContent),
      (err, data) => {
        if (err) console.log("\x1b[31m%s\x1b[0m", error);
      }
    );
  } catch (error) {
    return console.log("\x1b[31m%s\x1b[0m", error);
  }
}

module.exports.compile = compile;
