import { logger } from "@/utils";
import { validateFields } from "../validations";
import {
  controllerHandler,
  factoryHandler,
  jobHandler,
  middlewareHandler,
  repositoryHandler,
  serviceHandler,
  usecaseHandler,
} from "./handlers";

type MappedCommands =
  | "factory"
  | "middleware"
  | "controller"
  | "job"
  | "usecase"
  | "repository"
  | "service";

type CommandArgs = {
  factoryType: "middleware" | "controller" | "job";
  name: string;
  scope: string;
  repositoryType: "mongodb" | "mssql";
  database: string;
  schema: string;
  usecaseType: "db" | "http" | "mq" | "other";
};

export async function app(args: CommandArgs, command?: MappedCommands) {
  try {
    const MAPPED_COMMANDS = [
      "factory",
      "middleware",
      "controller",
      "job",
      "usecase",
      "repository",
      "service",
    ];

    const REQUIRED_FIELDS = {
      factory: ["name", "scope"],
      middleware: ["name", "scope"],
      job: ["name", "scope"],
      controller: ["name", "scope"],
      usecase: ["name", "scope"],
      repository: ["name", "database", "schema"],
      service: ["name", "scope"],
    };

    const HANDLERS = {
      factory: factoryHandler,
      middleware: middlewareHandler,
      job: jobHandler,
      controller: controllerHandler,
      usecase: usecaseHandler,
      repository: repositoryHandler,
      service: serviceHandler,
    };

    if (!command) {
      return logger({
        type: "info",
        message: "Run --help to see all commands",
      });
    }

    if (!MAPPED_COMMANDS.includes(command))
      return logger({
        type: "error",
        message: "Invalid command. Run --help to see all commands",
      });

    const FIELDS_TO_VALIDATE = REQUIRED_FIELDS[command];
    validateFields(FIELDS_TO_VALIDATE, args);

    const result = await HANDLERS[command]({ ...args });

    return result.map(({ type, message }) => logger({ type, message }));
  } catch (error) {
    return logger({ type: "error", message: error.message });
  }
}
