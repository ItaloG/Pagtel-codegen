import fsPromises from "node:fs/promises";
import fs from "node:fs";

export async function createFolderIfNotExists({
  defaultMainFolder,
  mainPath,
  newFolder,
}: CreateFolder.Params): CreateFolder.Result {
  const defaultPath = `${mainPath}/${defaultMainFolder}`;
  if (fs.existsSync(newFolder)) return;

  await fsPromises.mkdir(`${defaultPath}/${newFolder}`, {
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
