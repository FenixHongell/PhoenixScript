const illegalWords = require("../../../../ruleSet.json").illegalWords;
const caseWords = require("../../../../ruleSet.json").caseWords;
const fs = require("fs");
var check = 0;
//TODO make it save the compiled code.
function compileToPython(code) {
  let codeSnippets = code.split(" ");
  //Check for illegal words
  illegalWords.forEach((word) => {
    if (codeSnippets.includes(word)) {
      throw new Error("Illegal word/Declaration: " + word);
    }
  });
  codeSnippets.forEach((word, index) => {
    if (caseWords.includes(word))
      codeSnippets[index] = codeSnippets[index].toLowerCase();
  });

  //TODO cleanup & commenting
  codeSnippets = changeVoidSystem(codeSnippets);
  codeSnippets = changeBracketSystem(codeSnippets);
  codeSnippets = changeVariableSystem(codeSnippets);
  codeSnippets = changeArraySystem(codeSnippets);
  codeSnippets = changeMFloat(codeSnippets);
  codeSnippets = changeMInt(codeSnippets);
  codeSnippets = changeMString(codeSnippets);

  return codeSnippets.join(" ");
}

function changeVoidSystem(code) {
  // *Works
  code.forEach((snippet, index) => {
    let snippet_ = snippet.split("\n");
    snippet_.forEach((e, j) => {
      if (e == "void") snippet_[j] = "def";
    });
    code[index] = snippet_.join("\n");
  });
  console.log("\x1b[32m%s\x1b[0m", "\nCompiled functions");
  return code;
}
function changeBracketSystem(code) {
  // *Works
  code.forEach((snippet, index) => {
    if (snippet == "=>") {
      code[index] = ":";
    }
  });

  fs.writeFile(
    "./checks/check" + check + ".txt",
    code.join(" "),
    (err, data) => {
      if (err) console.log("\x1b[31m%s\x1b[0m", error);
    }
  );
  check += 1;
  console.log("\x1b[32m%s\x1b[0m", "\nCompiled structure");

  return code;
}
function changeVariableSystem(code) {
  // * Works
  code.forEach((snippet, index) => {
    if (snippet.startsWith("var::")) {
      let snippetParts = snippet.split("::");
      snippetParts[0] = "";
      code[index] = snippetParts.join("");
    }
  });
  fs.writeFile(
    "./checks/check" + check + ".txt",
    code.join(" "),
    (err, data) => {
      if (err) console.log("\x1b[31m%s\x1b[0m", error);
    }
  );
  check += 1;
  console.log("\x1b[32m%s\x1b[0m", "\nCompiled variables");
  return code;
}
function changeArraySystem(code) {
  // ! Not working
  console.log(code);
  code.forEach((snippet, index) => {
    if (snippet.includes("=")) {
      let snippet_ = snippet.split("=");
      snippet = snippet_[0];
    }
    if (snippet.startsWith("Array[")) {
      let snippetParts = snippet.split("[");
      snippetParts[0] = "";
      snippetParts = snippetParts.join("");
      if (snippetParts[snippetParts.length - 1] == "]")
        snippetParts[snippetParts - 1] = "";
      code[index] = snippet;
    }
  });
  fs.writeFile(
    "./checks/check" + check + ".txt",
    code.join(" "),
    (err, data) => {
      if (err) console.log("\x1b[31m%s\x1b[0m", error);
    }
  );
  check += 1;
  console.log("\x1b[32m%s\x1b[0m", "\nCompiled arrays");
  return code;
}
function changeMInt(code) {
  // ! Not working
  code.forEach((snippet, index) => {
    if (snippet.includes("MInt")) {
      code[index].replace("MInt", "int");
    }
  });
  fs.writeFile(
    "./checks/check" + check + ".txt",
    code.join(" "),
    (err, data) => {
      if (err) console.log("\x1b[31m%s\x1b[0m", error);
    }
  );
  check += 1;
  console.log("\x1b[32m%s\x1b[0m", "\nCompiled int casts");
  return code;
}
function changeMString(code) {
  // ! Not working
  code.forEach((snippet, index) => {
    if (snippet.includes("MStr")) {
      code[index].replace("MStr", "str");
    }
  });
  fs.writeFile(
    "./checks/check" + check + ".txt",
    code.join(" "),
    (err, data) => {
      if (err) console.log("\x1b[31m%s\x1b[0m", error);
    }
  );
  check += 1;
  console.log("\x1b[32m%s\x1b[0m", "\nCompiled string casts");
  return code;
}
function changeMFloat(code) {
  // ! Not working
  code.forEach((snippet, index) => {
    if (snippet.includes("MFloat")) {
      code[index].replace("MFloat", "float");
    }
  });
  fs.writeFile(
    "./checks/check" + check + ".txt",
    code.join(" "),
    (err, data) => {
      if (err) console.log("\x1b[31m%s\x1b[0m", error);
    }
  );
  check += 1;
  console.log("\x1b[32m%s\x1b[0m", "\nCompiled float casts");
  return code;
}

module.exports.compileToPython = compileToPython;
