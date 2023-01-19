#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { mapCommands } from "./config/map-commands";
import {
  generateFactoryFacade,
  generateMiddlewareFacade,
  generateRepositoryFacade,
  generateServiceFacade,
  generateUsecaseFacade,
} from "./facades";
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
      })
      .example("middleware --name GetDog --scope dog", "create a middleware")
      .example("middleware -n GetDog -s dog", "create a middleware");
  })
  .command("usecase", "Generate a usecase template", (builder) => {
    return builder
      .option("usecase-type", {
        alias: "t",
        describe: "Type of usecase",
        choices: ["db", "http", "mq"],
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
        "usecase --usecase-type db --name GetDog --scope dog",
        "create a database usecase"
      )
      .example("usecase -t db -n GetDog -s dog", "create a database usecase");
  })
  .command("repository", "Generate a repository template", (builder) => {
    return builder
      .option("repository-type", {
        alias: "t",
        describe: "Type of repository",
        choices: ["mssql", "mongodb"],
        demandOption: true,
      })
      .option("database", {
        alias: "d",
        describe: "Name of database",
        type: "string",
        demandOption: true,
      })
      .option("schema", {
        alias: "s",
        describe: "Folder where file will be generate",
        type: "string",
        demandOption: true,
      })
      .option("name", {
        alias: "n",
        describe: "Name of component",
        type: "string",
        demandOption: true,
      })
      .example(
        "repository --repository-type mssql --name GetDog --scope dog",
        "create a repository"
      )
      .example(
        "repository -t mssql -n GetDog -d dog -s dog",
        "create a repository"
      );
  })
  .command("service", "generate a service template", (builder) => {
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
      })
      .example("service --name GetDog --scope dog", "create a service")
      .example("service -n GetDog -s dog", "create a service");
  })
  .epilog("copyright ItaloG - Italo Gabriel 2022");

const REQUIRED_FIELDS: any = {
  factory: ["name", "scope"],
  middleware: ["name", "scope"],
  usecase: ["name", "scope"],
  repository: ["name", "database", "schema"],
  service: ["name", "scope"],
};
const TEMPLATE_GENERATORS = {
  factory: generateFactoryFacade,
  middleware: generateMiddlewareFacade,
  usecase: generateUsecaseFacade,
  repository: generateRepositoryFacade,
  service: generateServiceFacade,
};

// VALIDAR COMANDOS
// ADICIONAR LOGGER

try {
  const FIELDS_TO_VALIDATE = REQUIRED_FIELDS[commands[0]];
  validateFields(FIELDS_TO_VALIDATE, args);
  mapCommands(TEMPLATE_GENERATORS, commands, args);
} catch (error) {
  console.log(error);

  console.log(`\n ${error.message}`);
}
