import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateControllerFacade } from "@/facades";
import { generateControllerPath } from "@/utils";

describe("#Integration Controller Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a controller", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    await generateControllerFacade({
      ...data,
    });

    const MAIN_PATH = generateControllerPath();

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-controller.ts`;
    const indexScopePath = `${MAIN_PATH}/index.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexScopeResult = fs.existsSync(indexScopePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexScopeResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
