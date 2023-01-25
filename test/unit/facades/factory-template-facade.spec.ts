import { generateFactoryFacade } from "@/facades";
import { File, Folder } from "@/utils";

describe("#Factory Facade", () => {
  beforeAll(() => {
    jest.spyOn(Folder, "create").mockResolvedValue(Promise.resolve());
    jest.spyOn(File, "create").mockResolvedValue(Promise.resolve());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw a error if "factoryType" is undefined', async () => {
    const data = { name: "any_name", scope: "any_scope" };
    const promise = generateFactoryFacade(data);
    await expect(promise).rejects.toThrowError(
      "Você deve informar o tipo da factory"
    );
  });

  it("should return a info if the template file already exits", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(true);

    const expected = { type: "info", message: "Factory file already exists" };
    const result = await generateFactoryFacade({
      name: "any_name",
      scope: "any_scope",
      factoryType: "middleware",
    });
    expect(result).toStrictEqual(expected);
  });

  it("should create a folder if it not exists", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

    const createFolderSpy = jest.spyOn(Folder, "create");
    const createFileSpy = jest.spyOn(File, "create");

    await generateFactoryFacade({
      name: "any_name",
      scope: "any_scope",
      factoryType: "middleware",
    });

    const expected = {
      filePath: "test/integration/temp/src/main/factories/middleware/index.ts",
      fileContent: "export * from './any_scope';\n",
    };

    expect(createFolderSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenNthCalledWith(1, expected);
  });

  it("should not create a folder if it not exists", async () => {
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const createFolderSpy = jest.spyOn(Folder, "create");

    await generateFactoryFacade({
      name: "any_name",
      scope: "any_scope",
      factoryType: "middleware",
    });
    expect(createFolderSpy).not.toHaveBeenCalled();
  });

  it("should create a factory template file", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const fileCreateSpy = jest.spyOn(File, "create");

    const expected = { type: "success", message: "factory generated" };
    const result = await generateFactoryFacade({
      name: "any_name",
      scope: "any_scope",
      factoryType: "middleware",
    });

    expect(fileCreateSpy).toHaveBeenCalledTimes(2);
    expect(result).toStrictEqual(expected);
  });
});
