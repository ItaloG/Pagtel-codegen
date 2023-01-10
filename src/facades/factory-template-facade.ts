import { generateFactoryTemplate } from "@/templates";
import { Folder } from "@/folder";
import { File } from "@/file";
import { FormatString } from "@/utils";

export async function generateFactoryFacade({
  name,
  factoryType,
  scope,
}: FactoryFacade.Params): FactoryFacade.Result {
  if (!factoryType) throw new Error("Você deve informar o tipo da factory");

  const FACTORY_MAIN_PATH = `src/main/factories/${factoryType}`;

  const formattedScope = FormatString.convertToKebabCase(scope);
  const templateName = `make-${FormatString.convertToKebabCase(name)}`;
  const templateFilePath = `${FACTORY_MAIN_PATH}/${formattedScope}/${templateName}.ts`;

  const templateFileExists = File.verifyExists({ file: templateFilePath });
  if (templateFileExists)
    return { type: "info", message: "Factory file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${FACTORY_MAIN_PATH}/${formattedScope}`,
  });
  if (!scopeFolderExists)
    await Folder.create({ mainPath: FACTORY_MAIN_PATH, newFolder: scope });

  const indexFilePath = `${FACTORY_MAIN_PATH}/index.ts`;
  await File.create({
    filePath: indexFilePath,
    fileContent: `export * from ./${templateName}`,
  });

  const { template } = generateFactoryTemplate({
    componentName: name,
    componentType: factoryType,
  });

  await File.create({ filePath: templateFilePath, fileContent: template });

  return { type: "success", message: "factory generated" };
}

namespace FactoryFacade {
  export type Params = {
    name: string;
    factoryType?: "middleware" | "controller";
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
