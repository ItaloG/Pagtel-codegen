import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { File } from "@/file";

describe("#File", () => {
  test("#verifyExists should return true if folder exists", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(true);

    const result = File.verifyExists({ file: "" });

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(true);
  });

  test("#verifyExists should return false if folder not exists", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false);

    const result = File.verifyExists({ file: "" });

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(false);
  });

  test("#create should create a folder", async () => {
    jest.spyOn(fsPromises, "appendFile").mockResolvedValue(Promise.resolve());

    await File.create({
      fileContent: "",
      filePath: "newFile",
    });

    expect(fsPromises.appendFile).toHaveBeenCalledTimes(1);
  });
});
