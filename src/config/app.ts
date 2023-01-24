import { logger } from "@/utils";
import { validateFields } from "../validations";
import {
  controllerHandler,
  factoryHandler,
  middlewareHandler,
  repositoryHandler,
  serviceHandler,
  usecaseHandler,
} from "./handlers";

export async function app(args: object, command?: string) {
  try {
    const REQUIRED_FIELDS: any = {
      factory: ["name", "scope"],
      middleware: ["name", "scope"],
      controller: ["name", "scope"],
      usecase: ["name", "scope"],
      repository: ["name", "database", "schema"],
      service: ["name", "scope"],
    };

    const HANDLERS: any = {
      factory: factoryHandler,
      middleware: middlewareHandler,
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

    const FIELDS_TO_VALIDATE = REQUIRED_FIELDS[command];
    validateFields(FIELDS_TO_VALIDATE, args);

    const result: Array<{ type: any; message: string }> = await HANDLERS[
      command
    ]({ ...args });

    return result.map(({ type, message }) => logger({ type, message }));
  } catch (error) {
    return logger({ type: "error", message: error.message });
  }
}
