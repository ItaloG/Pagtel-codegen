import { generateFactoryTemplate } from "@/templates";
import { Folder } from "@/folder";
import { File } from "@/file";
import { FormatString, generateFactoryPath } from "@/utils";
import { generateIndex } from "./utils";

export async function generateFactoryFacade({
  name,
  factoryType,
  scope,
}: FactoryFacade.Params): FactoryFacade.Result {
  if (!factoryType) throw new Error("Você deve informar o tipo da factory");

  const FACTORY_MAIN_PATH = generateFactoryPath(factoryType);

  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = `make-${FormatString.convertToKebabCase(
    name
  )}-${factoryType}`;
  const TEMPLATE_FILE_PATH = `${FACTORY_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Factory file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${FACTORY_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists)
    await Folder.create({
      mainPath: FACTORY_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

  await generateIndex(
    `${FACTORY_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    TEMPLATE_NAME
  );

  const { template } = generateFactoryTemplate({
    componentName: name,
    componentType: factoryType,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

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
