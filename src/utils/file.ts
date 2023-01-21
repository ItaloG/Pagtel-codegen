import fsPromises from "node:fs/promises";
import fs from "node:fs";

export class File {
  static verifyExists({ file }: VerifyExists.Params): VerifyExists.Result {
    if (!fs.existsSync(file)) return false;
    return true;
  }

  static async create({
    fileContent,
    filePath,
  }: CreateFolder.Params): CreateFolder.Result {
    await fsPromises.appendFile(filePath, fileContent);
  }
}

namespace VerifyExists {
  export type Params = {
    file: string;
  };
  export type Result = boolean;
}

namespace CreateFolder {
  export type Params = {
    filePath: string;
    fileContent: string;
  };
  export type Result = Promise<void>;
}
