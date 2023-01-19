import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateServiceFacade } from "@/facades";
import { generateServicePath } from "@/utils";

describe("#Integration Service Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a service", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    await generateServiceFacade({
      ...data,
    });

    const MAIN_PATH = generateServicePath();

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
