#!/usr/bin/env node

import yargs from "yargs";

const options = yargs.usage("Usage: -f <file name>").option("f", {
  alias: "file",
  describe: "path to file || file name",
  type: "string",
  demandOption: true,
}).argv;
