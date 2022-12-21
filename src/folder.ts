import fsPromises from "node:fs/promises";
import fs from "node:fs";

export class Folder {
  static verifyExists({ folder }: VerifyExists.Params): VerifyExists.Result {
    if (!fs.existsSync(folder)) return false;
    return true;
  }

  static async create({
    defaultMainFolder,
    mainPath,
    newFolder,
  }: CreateFolder.Params): CreateFolder.Result {
    const defaultPath = `${mainPath}/${defaultMainFolder}`;
    await fsPromises.mkdir(`${defaultPath}/${newFolder}`, {
      recursive: true,
    });
  }
}

namespace VerifyExists {
  export type Params = {
    folder: string;
  };
  export type Result = boolean;
}

namespace CreateFolder {
  export type Params = {
    mainPath: string;
    defaultMainFolder: string;
    newFolder: string;
  };
  export type Result = Promise<void>;
}
