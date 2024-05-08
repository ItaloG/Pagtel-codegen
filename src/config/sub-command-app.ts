import { logger } from "@/utils";
import { validateFields } from "@/validations";
import { domainMockHandler, domainStubHandler } from "./handlers";

type MappedCommands = "mock";

type SubCommands = "domain";

type CommandArgs = { scope: string };

export async function subCommandApp(
  args: CommandArgs,
  command: MappedCommands,
  subCommand?: SubCommands
) {
  try {
    const MAPPED_COMMANDS = ["mock"];

    const MAPPED_SUBCOMMANDS = {
      mock: ["domain"],
    };

    const REQUIRED_FIELDS = {
      mock: {
        domain: ["scope"],
      },
    };

    const HANDLERS = {
      mock: {
        domain: [domainMockHandler, domainStubHandler],
      },
    };

    if (!MAPPED_COMMANDS.includes(command))
      return logger({
        type: "error",
        message: "Invalid command. Run --help to see all commands",
      });

    if (!subCommand) {
      return logger({
        type: "info",
        message: "Run --help to see all commands",
      });
    }

    if (!MAPPED_SUBCOMMANDS[command].includes(subCommand))
      return logger({
        type: "error",
        message: "Invalid command. Run --help to see all commands",
      });

    validateFields(REQUIRED_FIELDS[command][subCommand], args);

    const promises = HANDLERS[command][subCommand].map((handler) =>
      handler({
        ...args,
      })
    );

    const results = await Promise.all(promises);

    return results.flat().map(({ type, message }) => logger({ type, message }));
  } catch (error) {
    return logger({ type: "error", message: error.message });
  }
}
