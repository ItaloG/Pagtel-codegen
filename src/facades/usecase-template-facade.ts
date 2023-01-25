import { generateDataUsecaseTemplate } from "@/templates";
import { FormatString, generateUsecasePath, File, Folder } from "@/utils";
import { generateIndex } from "./utils";

export async function generateUsecaseFacade({
  name,
  scope,
  usecaseType,
}: UsecaseFacade.Params): UsecaseFacade.Result {
  if (!usecaseType) throw new Error("Você deve informar o tipo do usecase");

  const USECASE_MAIN_PATH = generateUsecasePath(usecaseType);
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = `${usecaseType}-${FormatString.convertToKebabCase(
    name
  )}`;
  const TEMPLATE_FILE_PATH = `${USECASE_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Usecase file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${USECASE_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists) {
    await Folder.create({
      mainPath: USECASE_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

    await generateIndex(`${USECASE_MAIN_PATH}/index.ts`, FORMATTED_SCOPE);
  }

  await generateIndex(
    `${USECASE_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    TEMPLATE_NAME
  );

  const { template } = generateDataUsecaseTemplate({
    componentName: name,
    componentType: usecaseType,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "usecase generated" };
}

namespace UsecaseFacade {
  export type Params = {
    name: string;
    usecaseType?: "db" | "http" | "mq";
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
