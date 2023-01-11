#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { mapCommands } from "./config/map-commands";
import { generateFactoryFacade } from "./facades";
import { validateFields } from "./validations";

const {
  argv: { _: commands, ...args },
}: any = yargs(hideBin(process.argv))
  .command("factory", "Generate a factory template", (builder) => {
    return builder
      .option("factory-type", {
        alias: "t",
        describe: "Type of factory",
        choices: ["middleware", "controller"],
        demandOption: true,
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
      })
      .example(
        "factory --factory-type middleware --name GetDog --scope dog",
        "create a middleware factory"
      )
      .example(
        "factory --factory-type controller --name GetDog --scope dog",
        "create a controller factory"
      )
      .example(
        "factory -t controller -n GetDog -s dog",
        "create a controller factory"
      );
  })
  .command("middleware", "Generate a middleware template", (builder) => {
    return builder
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
  })
  .epilog("copyright ItaloG - Italo Gabriel 2022");

const FIELDS_TO_VALIDATE = ["name", "scope"];

const TEMPLATE_GENERATORS = {
  factory: generateFactoryFacade,
};

// VALIDAR COMANDOS
// ADICIONAR LOGGER

try {
  validateFields(FIELDS_TO_VALIDATE, args);
  mapCommands(TEMPLATE_GENERATORS, commands, args);
} catch (error) {
  console.log(error);

  console.log(`\n ${error.message}`);
}
