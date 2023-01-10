import { generateFactoryFacade } from "@/facades";
import fsPromises from "node:fs/promises";
import fs from "node:fs";

describe("#Integration Factory Facade", () => {
  const TEMPLATE_FILE_PATH = `${__dirname}/temp/src/main/factories`;
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a middleware factory", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "middleware";
    await generateFactoryFacade({
      ...data,
      factoryType: type,
    });

    const templatePath = `${TEMPLATE_FILE_PATH}/${type}/${data.scope.toLowerCase()}/make-get-dog-middleware.ts`;
    const indexPath = `${TEMPLATE_FILE_PATH}/${type}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });

  it("should generate a controller factory", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "controller";
    await generateFactoryFacade({
      ...data,
      factoryType: type,
    });

    const templatePath = `${TEMPLATE_FILE_PATH}/${type}/${data.scope.toLowerCase()}/make-get-dog-controller.ts`;
    const indexPath = `${TEMPLATE_FILE_PATH}/${type}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
