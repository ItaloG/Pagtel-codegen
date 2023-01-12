import { File } from "@/file";
import { Folder } from "@/folder";
import { generateMiddlewareTemplate } from "@/templates";
import { FormatString, generateMiddlewarePath } from "@/utils";
import { generateIndex } from "./utils";

export async function generateMiddlewareFacade({
  name,
  scope,
}: MiddlewareFacade.Params): MiddlewareFacade.Result {
  const MIDDLEWARE_MAIN_PATH = generateMiddlewarePath();
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = `${FormatString.convertToKebabCase(name)}-middleware`;
  const TEMPLATE_FILE_PATH = `${MIDDLEWARE_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Middleware file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${MIDDLEWARE_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists)
    await Folder.create({
      mainPath: MIDDLEWARE_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

  await generateIndex(
    `${MIDDLEWARE_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    TEMPLATE_NAME
  );

  const { template } = generateMiddlewareTemplate({
    componentName: name,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "middleware generated" };
}

namespace MiddlewareFacade {
  export type Params = {
    name: string;
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
