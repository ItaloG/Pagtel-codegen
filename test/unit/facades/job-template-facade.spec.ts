import { generateJobFacade } from "@/facades";
import { File, Folder } from "@/utils";

describe("#Job Facade", () => {
  beforeAll(() => {
    jest.spyOn(Folder, "create").mockResolvedValue(Promise.resolve());
    jest.spyOn(File, "create").mockResolvedValue(Promise.resolve());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return a info if the template file already exits", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(true);

    const expected = {
      type: "info",
      message: "Job file already exists",
    };
    const result = await generateJobFacade({
      name: "any_name",
      scope: "any_scope",
    });
    expect(result).toStrictEqual(expected);
  });

  it("should create a folder if it not exists", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

    const createFolderSpy = jest.spyOn(Folder, "create");
    const createFileSpy = jest.spyOn(File, "create");

    await generateJobFacade({
      name: "any_name",
      scope: "any_scope",
    });

    const expected = {
      filePath: "test/integration/temp/src/job/jobs/index.ts",
      fileContent: "export * from './any_scope';\n",
    };

    expect(createFolderSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenCalled();
    expect(createFileSpy).toHaveBeenNthCalledWith(1, expected);
  });

  it("should not create a folder if it not exists", async () => {
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const createFolderSpy = jest.spyOn(Folder, "create");

    await generateJobFacade({
      name: "any_name",
      scope: "any_scope",
    });
    expect(createFolderSpy).not.toHaveBeenCalled();
  });

  it("should create a middleware template file", async () => {
    jest.spyOn(File, "verifyExists").mockReturnValueOnce(false);
    jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

    const fileCreateSpy = jest.spyOn(File, "create");

    const expected = { type: "success", message: "job generated" };
    const result = await generateJobFacade({
      name: "any_name",
      scope: "any_scope",
    });

    expect(fileCreateSpy).toHaveBeenCalledTimes(2);
    expect(result).toStrictEqual(expected);
  });
});
