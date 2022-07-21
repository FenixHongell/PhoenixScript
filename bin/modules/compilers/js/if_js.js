const ruleSet = require("../../../../ruleSet.json");

function CompileIf_JS(string) {
  console.log(string);
  let string_parts = string.split(" ");
  let ifStarted = false;
  let startingBracket = false;
  let finalString = [];
  string_parts.forEach((element, index) => {
    let thisElement = "";
    index++;
    if (ruleSet.illegal_if.includes(element) && ifStarted == true) {
      throw "illegal expression";
    }
    if (element == "if") {
      thisElement = "if(";
      ifStarted = true;
      startingBracket = true;
    }
    if (element == "{" && startingBracket == true) {
      thisElement = ") {";
      startingBracket = false;
    }
    if (element == "};" && ifStarted == true) {
      ifStarted = false;
    }

    if (startingBracket == true && ifStarted == true) {
      ifStarted = false;
      startingBracket = false;
      thisElement = ") {};";
    }

    if (thisElement == "") thisElement = element;

    finalString.push(thisElement);
  });
  if (ifStarted == true) {
    throw "bracket problem 1";
  }
  if (startingBracket == true) {
    throw "bracket problem 2";
  }

  return finalString.join(" ");
}
module.exports.compileIf_JS = CompileIf_JS;
