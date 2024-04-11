import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateRepositoryFacade } from "@/facades";
import { FormatString, generateRepositoryPath } from "@/utils";

describe("#Integration Repository Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a mssql repository", async () => {
    const data = { name: "GetDog", schema: "Dog", database: "Pets" };
    const type = "mssql";
    await generateRepositoryFacade({
      ...data,
      repositoryType: type,
    });

    const MAIN_PATH = generateRepositoryPath(type);

    const templatePath = `${MAIN_PATH}/${data.database.toLowerCase()}/${data.schema.toLowerCase()}/get-dog-repository.ts`;
    const indexScopePath = `${MAIN_PATH}/${data.database.toLowerCase()}/index.ts`;
    const indexPath = `${MAIN_PATH}/${data.database.toLowerCase()}/${data.schema.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexScopeResult = fs.existsSync(indexScopePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexScopeResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });

  it("should generate a mongodb repository", async () => {
    const data = { name: "GetDog", schema: "Dog", database: "Pets" };
    const type = "mongodb";
    await generateRepositoryFacade({
      ...data,
      repositoryType: type,
    });

    const MAIN_PATH = generateRepositoryPath(type);

    const formattedName = FormatString.convertToKebabCase(data.database);

    const templatePath = `${MAIN_PATH}/${formattedName}/get-dog-repository.ts`;
    const indexScopePath = `${MAIN_PATH}/index.ts`;
    const indexPath = `${MAIN_PATH}/${formattedName}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexScopeResult = fs.existsSync(indexScopePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexScopeResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
