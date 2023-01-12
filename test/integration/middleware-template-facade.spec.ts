import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateMiddlewareFacade } from "@/facades";

describe("#Integration Middleware Facade", () => {
  const TEMPLATE_FILE_PATH = `${__dirname}/temp/src/presentation/middlewares`;
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

    const templatePath = `${TEMPLATE_FILE_PATH}/${data.scope.toLowerCase()}/get-dog-middleware.ts`;
    const indexPath = `${TEMPLATE_FILE_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
