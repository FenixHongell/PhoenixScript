#!/usr/bin/env node
var { compile } = require("./modules/compile");
const child_process = require("child_process");
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -f <file name> -o <py name> ")
  .option("f", {
    alias: "file",
    describe: "path to file || file name",
    type: "string",
    demandOption: true,
  })
  .option("o", {
    alias: "output",
    describe: "path to file || file name",
    type: "string",
    demandOption: true,
  }).argv;

function compileAndRun() {
  compile(options.f, options.o);
  child_process.exec("Python3 " + options.o);
}

compileAndRun();
