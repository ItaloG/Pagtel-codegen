import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { Folder } from "@/utils";

describe("#Folder", () => {
  test("#verifyExists should return true if folder exists", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(true);

    const result = Folder.verifyExists({ folder: "" });

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(true);
  });

  test("#verifyExists should return false if folder not exists", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false);

    const result = Folder.verifyExists({ folder: "" });

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(false);
  });

  test("#create should create a folder", async () => {
    jest.spyOn(fsPromises, "mkdir").mockResolvedValue(Promise.resolve(""));

    await Folder.create({
      mainPath: "",
      newFolder: "newFolder",
    });

    expect(fsPromises.mkdir).toHaveBeenCalledTimes(1);
  });
});
