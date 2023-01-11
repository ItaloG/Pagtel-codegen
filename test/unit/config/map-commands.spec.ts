import { mapCommands } from "@/config/map-commands";

describe("#Config", () => {
  const factoryFunction = jest.fn();
  const TEMPLATE_GENERATORS = {
    factory: factoryFunction,
  };
  test("#mapCommands should ", () => {
    const commands = ["factory"];
    const args = { n: "name", name: "name", t: "type", type: "type" };
    mapCommands(TEMPLATE_GENERATORS, commands, args);
    expect(factoryFunction).toHaveBeenCalledTimes(1);
    expect(factoryFunction).toHaveBeenCalledWith(args);
  });
});
