import { generateFactoryFacade } from "@/facades";
import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateFactoryPath } from "@/utils";

describe("#Integration Factory Facade", () => {
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

    const MAIN_PATH = generateFactoryPath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/make-get-dog-middleware.ts`;
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

  it("should generate a controller factory", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "controller";
    await generateFactoryFacade({
      ...data,
      factoryType: type,
    });

    const MAIN_PATH = generateFactoryPath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/make-get-dog-controller.ts`;
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

  it("should generate a job factory", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "job";
    await generateFactoryFacade({
      ...data,
      factoryType: type,
    });

    const MAIN_PATH = generateFactoryPath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/make-get-dog-job.ts`;
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
