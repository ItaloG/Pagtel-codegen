import { generateUsecaseFacade } from "@/facades";
import { File, Folder } from "@/utils";

describe("#Usecase Facade", () => {
  beforeAll(() => {
    jest.spyOn(Folder, "create").mockResolvedValue(Promise.resolve());
    jest.spyOn(File, "create").mockResolvedValue(Promise.resolve());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw a error if "factoryType" is undefined', async () => {
    const data = { name: "any_name", scope: "any_scope" };
    const promise = generateUsecaseFacade(data);
    await expect(promise).rejects.toThrowError(
      "Você deve informar o tipo do usecase"
    );
  });

  it("should return a info if the template file already exits", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(true);

    const expected = { type: "info", message: "Usecase file already exists" };
    const result = await generateUsecaseFacade({
      name: "any_name",
      scope: "any_scope",
      usecaseType: "db",
    });
    expect(result).toStrictEqual(expected);
  });

  it("should create a folder if it not exists", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

    const createFolderSpy = jest.spyOn(Folder, "create");
    const createFileSpy = jest.spyOn(File, "create");

    await generateUsecaseFacade({
      name: "any_name",
      scope: "any_scope",
      usecaseType: "db",
    });

    const expected = {
      filePath: "test/integration/temp/src/data/usecases/db/index.ts",
      fileContent: "export * from './any_scope';\n",
    };

    expect(createFolderSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenNthCalledWith(1, expected);
  });

  it("should not create a folder if it not exists", async () => {
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const createFolderSpy = jest.spyOn(Folder, "create");

    await generateUsecaseFacade({
      name: "any_name",
      scope: "any_scope",
      usecaseType: "db",
    });
    expect(createFolderSpy).not.toHaveBeenCalled();
  });

  it("should create a usecase template file", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const fileCreateSpy = jest.spyOn(File, "create");

    const expected = { type: "success", message: "usecase generated" };
    const result = await generateUsecaseFacade({
      name: "any_name",
      scope: "any_scope",
      usecaseType: "db",
    });

    expect(fileCreateSpy).toHaveBeenCalledTimes(2);
    expect(result).toStrictEqual(expected);
  });
});
