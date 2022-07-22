const illegalWords = require("../../../../ruleSet.json").illegalWords;

function compileToPython(code) {
  let codeSnippets = code.split(" ");
  //Check for illegal words
  illegalWords.forEach((word) => {
    if (codeSnippets.includes(word)) {
      throw new Error("Illegal word/Declaration: " + word);
    }
  }); //TODO Make it save returned value and run again + cleanup & commenting
  changeVoidSystem(codeSnippets);
  changeBracketSystem(codeSnippets);
  changeVariableSystem(codeSnippets);
  changeArraySystem(codeSnippets);
  changeMFloat(codeSnippets);
  changeMInt(codeSnippets);
  changeMString(codeSnippets);

  return code.join("");
}

function changeVoidSystem(code) {
  code.forEach((snippet, index) => {
    if (snippet == "void") code[index] = "def";
  });
  return code;
}
function changeBracketSystem(code) {
  code.forEach((snippet, index) => {
    if (snippet == "=>") {
      code[index] = ":";
    }
  });
  return code;
}
function changeVariableSystem(code) {
  code.forEach((snippet, index) => {
    if (snippet.startsWith("var::")) {
      let snippetParts = snippet.split("::");
      snippetParts[0] = "";
    }
  });
  return code;
}
function changeArraySystem(code) {
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
  return code;
}
function changeMInt(code) {
  code.forEach((snippet, index) => {
    if (snippet.includes("MInt")) {
      code[index].replace("MInt", "int");
    }
  });
  return code;
}
function changeMString(code) {
  code.forEach((snippet, index) => {
    if (snippet.includes("MStr")) {
      code[index].replace("MStr", "str");
    }
  });
  return code;
}
function changeMFloat(code) {
  code.forEach((snippet, index) => {
    if (snippet.includes("MFloat")) {
      code[index].replace("MFloat", "float");
    }
  });
  return code;
}

module.exports.compileToPython = compileToPython;
