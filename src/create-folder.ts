import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { FormatString } from "./utils";

export async function createFolderIfNotExists({
  defaultMainFolder,
  mainPath,
  newFolder,
}: CreateFolder.Params): CreateFolder.Result {
  const formattedFolder = FormatString.convertToKebabCase(newFolder);
  const defaultPath = `${mainPath}/${defaultMainFolder}`;
  if (fs.existsSync(formattedFolder)) return;

  await fsPromises.mkdir(`${defaultPath}/${formattedFolder}`, {
    recursive: true,
  });
}

namespace CreateFolder {
  export type Params = {
    mainPath: string;
    defaultMainFolder: string;
    newFolder: string;
  };
  export type Result = Promise<void>;
}
