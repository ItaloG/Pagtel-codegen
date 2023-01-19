import { validateMongodbFolder, validateMssqlFolder } from "@/facades/utils";
import { Folder } from "@/folder";

describe("#Repository Folder Validations", () => {
  beforeAll(() => {
    jest.spyOn(Folder, "create").mockReturnValue(Promise.resolve());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("#validateMssqlFolder", () => {
    it("should generate database and schema folder if they not exists", async () => {
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

      const verifyExistsSpy = jest.spyOn(Folder, "verifyExists");
      const createSpy = jest.spyOn(Folder, "create");

      const data = {
        database: "any_database",
        mainPath: "any_main_path",
        schema: "any_schema",
      };

      await validateMssqlFolder(data);

      const firstExpected = {
        mainPath: data.mainPath,
        newFolder: data.database,
      };

      const lastExpected = {
        mainPath: `${data.mainPath}/${data.database}`,
        newFolder: data.schema,
      };

      expect(createSpy).toHaveBeenCalledTimes(2);
      expect(createSpy).toHaveBeenNthCalledWith(1, firstExpected);
      expect(createSpy).toHaveBeenNthCalledWith(2, lastExpected);
      expect(verifyExistsSpy).toHaveBeenCalledTimes(2);
    });

    it("should generate schema folder if it not exists", async () => {
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

      const verifyExistsSpy = jest.spyOn(Folder, "verifyExists");
      const createSpy = jest.spyOn(Folder, "create");

      const data = {
        database: "any_database",
        mainPath: "any_main_path",
        schema: "any_schema",
      };

      await validateMssqlFolder(data);

      const expected = {
        mainPath: `${data.mainPath}/${data.database}`,
        newFolder: data.schema,
      };

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(expected);
      expect(verifyExistsSpy).toHaveBeenCalledTimes(2);
    });

    it("should not generate database and schema folder if they exists", async () => {
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

      const verifyExistsSpy = jest.spyOn(Folder, "verifyExists");
      const createSpy = jest.spyOn(Folder, "create");

      const data = {
        database: "any_database",
        mainPath: "any_main_path",
        schema: "any_schema",
      };

      await validateMssqlFolder(data);

      expect(createSpy).not.toHaveBeenCalled();
      expect(verifyExistsSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("#validateMongodbFolder", () => {
    it("should generate scope folder if it not exists", async () => {
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(false);

      const verifyExistsSpy = jest.spyOn(Folder, "verifyExists");
      const createSpy = jest.spyOn(Folder, "create");

      const data = {
        scope: "any_database",
        mainPath: "any_main_path",
      };

      await validateMongodbFolder(data);

      const expected = {
        mainPath: data.mainPath,
        newFolder: data.scope,
      };

      expect(createSpy).toHaveBeenCalledWith(expected);
      expect(verifyExistsSpy).toHaveBeenCalledTimes(1);
    });

    it("should not generate scope folder if it exists", async () => {
      jest.spyOn(Folder, "verifyExists").mockReturnValueOnce(true);

      const verifyExistsSpy = jest.spyOn(Folder, "verifyExists");
      const createSpy = jest.spyOn(Folder, "create");

      const data = {
        scope: "any_database",
        mainPath: "any_main_path",
      };

      await validateMongodbFolder(data);

      expect(createSpy).not.toHaveBeenCalled();
      expect(verifyExistsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
