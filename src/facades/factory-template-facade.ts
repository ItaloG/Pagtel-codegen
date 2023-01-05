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

  const folderExists = Folder.verifyExists({
    folder: `${FACTORY_MAIN_PATH}/${formattedScope}`,
  });

  if (!folderExists)
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

  const templateFilePath = `${FACTORY_MAIN_PATH}/${formattedScope}/${templateName}.ts`;
  await File.create({ filePath: templateFilePath, fileContent: template });

  return factoryType;
}

namespace FactoryFacade {
  export type Params = {
    name: string;
    factoryType?: "middleware" | "controller";
    scope: string;
  };
  export type Result = Promise<string>;
}
