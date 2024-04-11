#!/usr/bin/env node

import yargs from "yargs";
import colors from "colors";
import { hideBin } from "yargs/helpers";
import { app } from "./config";

const {
  argv: {
    _: [command],
    ...args
  },
}: any = yargs(hideBin(process.argv))
  .command("factory", "Generate a factory template", (builder) => {
    return builder
      .option("factory-type", {
        alias: "t",
        describe: "Type of factory",
        choices: ["middleware", "controller", "job"],
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
        "factory --factory-type job --name GetDog --scope dog",
        "create a job factory"
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
  .command("controller", "Generate a controller template", (builder) => {
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
      .example("controller --name GetDog --scope dog", "create a controller")
      .example("controller -n GetDog -s dog", "create a controller");
  })
  .command("job", "Generate a job template", (builder) => {
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
      .example("job --name GetDog --scope dog", "create a job")
      .example("job -n GetDog -s dog", "create a job");
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
        "repository --repository-type mssql --database Animal --schema mammals --name dog",
        "create a repository"
      )
      .example(
        "repository -t mssql -d Animal -s mammals -n dog",
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

colors.enable();

(async () => {
  await app(args, command);
})();
