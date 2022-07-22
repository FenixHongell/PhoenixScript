const illegalWords = require("../../../../ruleSet.json").illegalWords;

function compileToPython(code) {
  let codeSnippets = code.split(" ");
  //Check for illegal words
  illegalWords.forEach((word) => {
    if (codeSnippets.includes(word)) {
      throw new Error("Illegal word/Declaration: " + word);
    }
  });
  changeVoidSystem(codeSnippets);
  changeBracketSystem(codeSnippets);
  changeVariableSystem(codeSnippets);
  changeArraySystem(codeSnippets);
  changeMFloat(codeSnippets);
  changeMInt(codeSnippets);
  changeMString(codeSnippets);
}

function changeVoidSystem(code) {
  code.forEach((snippet, index) => {
    if (snippet == "void") code[index] = "def";
  });
}
function changeBracketSystem(code) {
  code.forEach((snippet, index) => {
    if (snippet == "=>") {
      code[index] = ":";
    }
  });
}
function changeVariableSystem(code) {
  code.forEach((snippet, index) => {
    if (snippet.startsWith("var::")) {
      let snippetParts = snippet.split("::");
      snippetParts[0] = "";
    }
  });
}
function changeArraySystem(code) {
  code.forEach((snippet, index) => {
    if (snippet.startsWith("Array[")) {
      let snippetParts = snippet.split("[");
      snippetParts[0] = "";
      snippetParts = snippetParts.join("");
      snippetParts.split("]");
      snippetParts.join("");
    }
  });
}
function changeMInt(code) {
  code.forEach((snippet, index) => {
    if (snippet.includes("MInt")) {
      code[index].replace("MInt", "int");
    }
  });
}
function changeMString(code) {
  code.forEach((snippet, index) => {
    if (snippet.includes("MStr")) {
      code[index].replace("MStr", "str");
    }
  });
}
function changeMFloat(code) {
  code.forEach((snippet, index) => {
    if (snippet.includes("MFloat")) {
      code[index].replace("MFloat", "float");
    }
  });
}
