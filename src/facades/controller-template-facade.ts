import { generateControllerTemplate } from "@/templates";
import { FormatString, generateControllerPath, File, Folder } from "@/utils";
import { generateIndex } from "./utils";

export async function generateControllerFacade({
  name,
  scope,
}: ControllerFacade.Params): ControllerFacade.Result {
  const CONTROLLER_MAIN_PATH = generateControllerPath();
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = `${FormatString.convertToKebabCase(name)}-controller`;
  const TEMPLATE_FILE_PATH = `${CONTROLLER_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Controller file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${CONTROLLER_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists)
    await Folder.create({
      mainPath: CONTROLLER_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

  await generateIndex(
    `${CONTROLLER_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    TEMPLATE_NAME
  );

  const { template } = generateControllerTemplate({
    componentName: name,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "controller generated" };
}

namespace ControllerFacade {
  export type Params = {
    name: string;
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
