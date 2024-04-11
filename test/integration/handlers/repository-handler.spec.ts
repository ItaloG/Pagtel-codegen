import { repositoryHandler } from "@/config/handlers";
import { generateRepositoryPath } from "@/utils";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

describe("#Integration Repository Handler", () => {
  afterEach(async () => {
    await fsPromises.rm("test/integration/temp/src", {
      recursive: true,
    });
  });

  it("should generate a MSSQL Repository on success", async () => {
    const data: any = {
      name: "GetDog",
      database: "Animal",
      schema: "Dog",
      repositoryType: "mssql",
    };
    await repositoryHandler(data);

    const REPOSITORY_MAIN_PATH = generateRepositoryPath(data.repositoryType);

    const repositoryTemplatePath = `${REPOSITORY_MAIN_PATH}/${data.database.toLowerCase()}/${data.schema.toLowerCase()}/get-dog-repository.ts`;
    const repositoryIndexScopePath = `${REPOSITORY_MAIN_PATH}/${data.database.toLowerCase()}/index.ts`;
    const repositoryIndexPath = `${REPOSITORY_MAIN_PATH}/${data.database.toLowerCase()}/${data.schema.toLowerCase()}/index.ts`;

    const repositoryResult = fs.existsSync(repositoryTemplatePath);
    const repositoryIndexScopeResult = fs.existsSync(repositoryIndexScopePath);
    const repositoryIndexResult = fs.existsSync(repositoryIndexPath);
    const expected = true;

    expect(repositoryResult).toStrictEqual(expected);
    expect(repositoryIndexScopeResult).toStrictEqual(expected);
    expect(repositoryIndexResult).toStrictEqual(expected);
  });

  it("should generate a MONGODB Repository on success", async () => {
    const data: any = {
      name: "GetDog",
      database: "Animal",
      schema: "Dog",
      repositoryType: "mongodb",
    };
    await repositoryHandler(data);

    const REPOSITORY_MAIN_PATH = generateRepositoryPath(data.repositoryType);

    const repositoryPath = `${REPOSITORY_MAIN_PATH}/${data.database.toLowerCase()}/get-dog-repository.ts`;
    const modelPath = `${REPOSITORY_MAIN_PATH}/${data.database.toLowerCase()}/get-dog-model.ts`;
    const repositoryIndexScopePath = `${REPOSITORY_MAIN_PATH}/${data.database.toLowerCase()}/index.ts`;
    const repositoryIndexPath = `${REPOSITORY_MAIN_PATH}/${data.database.toLowerCase()}/index.ts`;

    const repositoryResult = fs.existsSync(repositoryPath);
    const modelResult = fs.existsSync(modelPath);
    const repositoryIndexScopeResult = fs.existsSync(repositoryIndexScopePath);
    const repositoryIndexResult = fs.existsSync(repositoryIndexPath);
    const expected = true;

    expect(repositoryResult).toStrictEqual(expected);
    expect(modelResult).toStrictEqual(expected);
    expect(repositoryIndexScopeResult).toStrictEqual(expected);
    expect(repositoryIndexResult).toStrictEqual(expected);
  });
});
