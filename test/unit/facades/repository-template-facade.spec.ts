import { generateRepositoryFacade } from "@/facades";
import { File, Folder } from "@/utils";

describe("#Repository Facade", () => {
  beforeAll(() => {
    jest.spyOn(Folder, "create").mockResolvedValue(Promise.resolve());
    jest.spyOn(File, "create").mockResolvedValue(Promise.resolve());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw a error if "repositoryType" is undefined', async () => {
    const data = {
      name: "any_name",
      database: "any_database",
      schema: "any_schema",
    };
    const promise = generateRepositoryFacade(data);
    await expect(promise).rejects.toThrowError(
      "Você deve informar o tipo do repository"
    );
  });

  it("should return a info if the template file already exits", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(true);

    const expected = {
      type: "info",
      message: "Repository file already exists",
    };
    const result = await generateRepositoryFacade({
      name: "any_name",
      database: "any_database",
      schema: "any_schema",
      repositoryType: "mongodb",
    });
    expect(result).toStrictEqual(expected);
  });

  it("if 'repositoryType' is mssql should create a database and schema folder if it not exists", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

    const createFolderSpy = jest.spyOn(Folder, "create");
    const createFileSpy = jest.spyOn(File, "create");

    await generateRepositoryFacade({
      name: "any_name",
      database: "any_database",
      schema: "any_schema",
      repositoryType: "mssql",
    });

    const expected = {
      filePath:
        "test/integration/temp/src/infra/db/mssql/any_database/index.ts",
      fileContent: "export * from './any_schema';\n",
    };

    expect(createFolderSpy).toHaveBeenCalledTimes(2);
    expect(createFileSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenNthCalledWith(1, expected);
  });

  it("if 'repositoryType' is mongodb should create a folder if it not exists", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

    const createFolderSpy = jest.spyOn(Folder, "create");
    const createFileSpy = jest.spyOn(File, "create");

    await generateRepositoryFacade({
      name: "any_name",
      database: "any_database",
      schema: "any_schema",
      repositoryType: "mongodb",
    });

    const expected = {
      filePath: "test/integration/temp/src/infra/db/mongodb/index.ts",
      fileContent: "export * from './any_database';\n",
    };

    expect(createFolderSpy).toHaveBeenCalledTimes(1);
    expect(createFileSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenNthCalledWith(1, expected);
  });

  it("should not create a folder if it not exists", async () => {
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const createFolderSpy = jest.spyOn(Folder, "create");

    await generateRepositoryFacade({
      name: "any_name",
      database: "any_database",
      schema: "any_schema",
      repositoryType: "mssql",
    });
    expect(createFolderSpy).not.toHaveBeenCalled();
  });

  it("should create a repository template file", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const fileCreateSpy = jest.spyOn(File, "create");

    const expected = { type: "success", message: "repository generated" };
    const result = await generateRepositoryFacade({
      name: "any_name",
      database: "any_database",
      schema: "any_schema",
      repositoryType: "mssql",
    });

    expect(fileCreateSpy).toHaveBeenCalledTimes(2);
    expect(result).toStrictEqual(expected);
  });
});
