import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateMiddlewareFacade } from "@/facades";
import { generateMiddlewarePath } from "@/utils";

describe("#Integration Middleware Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a middleware", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    await generateMiddlewareFacade({
      ...data,
    });

    const MAIN_PATH = generateMiddlewarePath();

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-middleware.ts`;
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
