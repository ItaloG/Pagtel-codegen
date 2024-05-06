import { logger } from "@/utils";
import { validateFields } from "@/validations";

type MappedCommands = "test";

type SubCommands = "domain";

export async function subCommandApp(
  args: object,
  command: MappedCommands,
  subCommand?: SubCommands
) {
  try {
    const MAPPED_COMMANDS = ["test"];

    const MAPPED_SUBCOMMANDS = {
      test: ["domain"],
    };

    const REQUIRED_FIELDS = {
      test: {
        domain: ["scope"],
      },
    };

    const HANDLERS = {
      test: {
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
