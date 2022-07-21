const fs = require("fs");
var { compileIf_JS } = require("./compilers/js/if_js.js");

async function compile(file) {
  try {
    let fileContent = fs.readFileSync(file);
    fileContent = await compileIf_JS(fileContent);
  } catch (error) {
    return console.log(
      "\x1b[31m%s\x1b[0m",
      "Compiler ran into an error: " + error
    );
  }
}

module.exports.compile = compile;
