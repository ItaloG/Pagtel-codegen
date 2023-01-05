import { generateFactoryFacade } from "@/facades";
import { File } from "@/file";
import { Folder } from "@/folder";

describe("#Factory Facade", () => {
  it('should throw a error if "factoryType" is undefined', async () => {
    const data = { name: "any_name", scope: "any_scope" };
    const promise = generateFactoryFacade(data);
    await expect(promise).rejects.toThrowError(
      "Você deve informar o tipo da factory"
    );
  });

  it("should create a folder if it not exists", async () => {
    jest.spyOn(Folder, "verifyExists").mockReturnValue(false);
    jest.spyOn(Folder, "create").mockResolvedValue(Promise.resolve());
    jest.spyOn(File, "create").mockResolvedValue(Promise.resolve());

    const createFolderSpy = jest.spyOn(Folder, "create");
    await generateFactoryFacade({
      name: "any_name",
      scope: "any_scope",
      factoryType: "middleware",
    });
    expect(createFolderSpy).toHaveBeenCalled();
  });

  it("should not create a folder if it not exists", async () => {
    jest.spyOn(Folder, "verifyExists").mockReturnValue(true);
    jest.spyOn(Folder, "create").mockResolvedValue(Promise.resolve());
    jest.spyOn(File, "create").mockResolvedValue(Promise.resolve());

    const createFolderSpy = jest.spyOn(Folder, "create");
    await generateFactoryFacade({
      name: "any_name",
      scope: "any_scope",
      factoryType: "middleware",
    });
    expect(createFolderSpy).not.toHaveBeenCalled();
  });

  it("should create a factory template file", async () => {
    jest.spyOn(Folder, "verifyExists").mockReturnValue(true);
    jest.spyOn(Folder, "create").mockResolvedValue(Promise.resolve());
    const fileCreateSpy = jest
      .spyOn(File, "create")
      .mockResolvedValue(Promise.resolve());

    await generateFactoryFacade({
      name: "any_name",
      scope: "any_scope",
      factoryType: "middleware",
    });

    expect(fileCreateSpy).toHaveBeenCalledTimes(2);
  });
});
