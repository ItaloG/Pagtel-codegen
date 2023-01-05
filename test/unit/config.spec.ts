import { mapCommands } from "@/config/map-commands";

describe("#Config", () => {
  const factoryFunction = jest.fn();
  const TEMPLATE_GENERATORS = {
    factory: factoryFunction,
  };
  test("#mapCommands should ", () => {
    const data = { f: "f", factory: "factory" };
    mapCommands(TEMPLATE_GENERATORS, data);
    expect(factoryFunction).toHaveBeenCalledTimes(1);
    expect(factoryFunction).toHaveBeenCalledWith(data);
  });
});
