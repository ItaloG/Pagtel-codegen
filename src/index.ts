#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { argv } = yargs(hideBin(process.argv))
  .option("generate", {
    alias: "g",
    describe: "Generate a template",
    type: "array",
    demandOption: true,
    choices: [
      "repository",
      "factory",
      "service",
      "usecase",
      "middleware",
      "controller",
    ],
  })
  .option("name", {
    alias: "n",
    describe: "Name of component",
    type: "string",
    demandOption: true,
  });

console.log(argv);
