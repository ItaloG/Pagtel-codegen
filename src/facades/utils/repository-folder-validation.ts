import { Folder } from "@/utils";
import { generateIndex } from "./generate-index";

export async function validateMssqlFolder({
  mainPath,
  database,
  schema,
}: {
  mainPath: string;
  database: string;
  schema: string;
}) {
  const databaseFolderExists = Folder.verifyExists({
    folder: `${mainPath}/${database}`,
  });
  if (!databaseFolderExists)
    await Folder.create({
      mainPath,
      newFolder: database,
    });

  const schemaFolderExists = Folder.verifyExists({
    folder: `${mainPath}/${database}/${schema}`,
  });
  if (!schemaFolderExists) {
    await Folder.create({
      mainPath: `${mainPath}/${database}`,
      newFolder: schema,
    });

    await generateIndex(`${mainPath}/${database}/index.ts`, schema);
  }
}

export async function validateMongodbFolder({
  mainPath,
  scope,
}: {
  mainPath: string;
  scope: string;
}) {
  const scopeFolderExists = Folder.verifyExists({
    folder: `${mainPath}/${scope}`,
  });
  if (!scopeFolderExists) {
    await Folder.create({
      mainPath: `${mainPath}`,
      newFolder: scope,
    });

    await generateIndex(`${mainPath}/index.ts`, scope);
  }
}
