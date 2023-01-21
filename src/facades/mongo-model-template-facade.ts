import { File, Folder, FormatString, generateMongoModelPath } from "@/utils";
import { generateMongoModelTemplate } from "@/templates";

export async function generateMongoModelFacade({
  name,
  scope,
}: MongoModelFacade.Params): MongoModelFacade.Result {
  const MONGO_MODEL_MAIN_PATH = generateMongoModelPath();
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = `${FormatString.convertToKebabCase(name)}-model`;
  const TEMPLATE_FILE_PATH = `${MONGO_MODEL_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Mongo model file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${MONGO_MODEL_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists)
    await Folder.create({
      mainPath: MONGO_MODEL_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

  const { template } = generateMongoModelTemplate({
    componentName: name,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "mongo model generated" };
}

namespace MongoModelFacade {
  export type Params = {
    name: string;
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
