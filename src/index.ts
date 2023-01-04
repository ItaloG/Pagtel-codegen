#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { mapCommands } from "./config/map-commands";
import { generateFactoryFacade } from "./facades";
import { validateFields } from "./validations";

// const { argv } = yargs(hideBin(process.argv))
//   .option("generate", {
//     alias: "g",
//     describe: "Generate a template",
//     type: "array",
//     demandOption: true,
//     choices: [
//       "repository",
//       "factory",
//       "service",
//       "usecase",
//       "middleware",
//       "controller",
//     ],
//   })
//   .option("name", {
//     alias: "n",
//     describe: "Name of component",
//     type: "string",
//     demandOption: true,
//   })
//   .option("scope", {
//     alias: "s",
//     describe: "Folder where file will be generate",
//     type: "string",
//     demandOption: true,
//   });

const { argv }: any = yargs(hideBin(process.argv)).command(
  "generate",
  "Generate a template",
  (builder) => {
    return builder
      .option("factory", {
        alias: "f",
        describe: "Generate a factory",
        type: "array",
        demandOption: true,
        choices: ["middleware", "controller"],
      })
      .option("name", {
        alias: "n",
        describe: "Name of component",
        type: "string",
        demandOption: true,
      })
      .option("scope", {
        alias: "s",
        describe: "Folder where file will be generate",
        type: "string",
        demandOption: true,
      });
  }
);

const FIELDS_TO_VALIDATE = ["name", "scope"];

const TEMPLATE_GENERATORS = {
  factory: generateFactoryFacade,
};

try {
  validateFields(FIELDS_TO_VALIDATE, argv);
  mapCommands(TEMPLATE_GENERATORS, argv);
} catch (error) {
  console.log(`\n ${error.message}`);
}

console.log(argv);
