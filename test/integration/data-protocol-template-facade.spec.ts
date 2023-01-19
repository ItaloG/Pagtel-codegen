import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateDataProtocolPath } from "@/utils";
import { generateDataProtocolFacade } from "@/facades";

describe("#Integration Data Protocol Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a db data protocol", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "db";
    await generateDataProtocolFacade({
      ...data,
      protocolType: type,
    });

    const MAIN_PATH = generateDataProtocolPath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-repository.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });

  it("should generate a http data protocol", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "http";
    await generateDataProtocolFacade({
      ...data,
      protocolType: type,
    });

    const MAIN_PATH = generateDataProtocolPath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-service.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
