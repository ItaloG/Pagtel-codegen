import { generateServiceTemplate } from "@/templates";
import { FormatString, generateServicePath, File, Folder } from "@/utils";
import { generateIndex } from "./utils";

export async function generateServiceFacade({
  name,
  scope,
}: ServiceFacade.Params): ServiceFacade.Result {
  const SERVICE_MAIN_PATH = generateServicePath();
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = `${FormatString.convertToKebabCase(name)}-service`;
  const TEMPLATE_FILE_PATH = `${SERVICE_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Service file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${SERVICE_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists) {
    await Folder.create({
      mainPath: SERVICE_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

    await generateIndex(`${SERVICE_MAIN_PATH}/index.ts`, FORMATTED_SCOPE);
  }

  await generateIndex(
    `${SERVICE_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    TEMPLATE_NAME
  );

  const { template } = generateServiceTemplate({
    componentName: name,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "service generated" };
}

namespace ServiceFacade {
  export type Params = {
    name: string;
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
