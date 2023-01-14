import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateUsecaseFacade } from "@/facades";
import { generateUsecasePath } from "@/utils";

describe("#Integration Usecase Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a database usecase", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "db";
    await generateUsecaseFacade({
      ...data,
      usecaseType: type,
    });

    const MAIN_PATH = generateUsecasePath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/db-get-dog.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });

  it("should generate a http request usecase", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "http";
    await generateUsecaseFacade({
      ...data,
      usecaseType: type,
    });

    const MAIN_PATH = generateUsecasePath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/http-get-dog.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });

  it("should generate a mq request usecase", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    const type = "mq";
    await generateUsecaseFacade({
      ...data,
      usecaseType: type,
    });

    const MAIN_PATH = generateUsecasePath(type);

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/mq-get-dog.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
