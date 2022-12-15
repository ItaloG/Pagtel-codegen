import { createFolderIfNotExists } from "@/create-folder";

import fsPromises from "node:fs/promises";
import fs from "node:fs";

describe("#CreateFolder", () => {
  test("#createFolderIfNotExists should create folder if it doesn't exists", async () => {
    jest.spyOn(fsPromises, "mkdir").mockResolvedValue(Promise.resolve(""));
    jest.spyOn(fs, "existsSync").mockReturnValue(false);

    await createFolderIfNotExists({
      mainPath: "",
      defaultMainFolder: "",
      newFolder: "newFolder",
    });

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(1);
  });

  test("#createFolderIfNotExists should not create folders if it exists", async () => {
    jest.spyOn(fsPromises, "mkdir").mockResolvedValue(Promise.resolve(""));
    jest.spyOn(fs, "existsSync").mockReturnValue(true);

    await createFolderIfNotExists({
      mainPath: "",
      defaultMainFolder: "",
      newFolder: "newFolder",
    });

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fsPromises.mkdir).not.toHaveBeenCalled();
  });
});
