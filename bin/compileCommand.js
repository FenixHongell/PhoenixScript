#!/usr/bin/env node

var { compile } = require("./modules/compile");
var yargs = require("yargs");

const options = yargs.usage("Usage: -f <file name>").option("f", {
  alias: "file",
  describe: "path to file || file name",
  type: "string",
  demandOption: true,
}).argv;

compile(options.f);
