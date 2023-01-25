import { File, Folder, FormatString, generateDomainUsecasePath } from "@/utils";
import { generateDomainUsecaseTemplate } from "@/templates";
import { generateIndex } from "./utils";

export async function generateDomainUsecaseFacade({
  name,
  scope,
}: DomainUsecaseFacade.Params): DomainUsecaseFacade.Result {
  const DOMAIN_USECASE_MAIN_PATH = generateDomainUsecasePath();
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = FormatString.convertToKebabCase(name);
  const TEMPLATE_FILE_PATH = `${DOMAIN_USECASE_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Domain usecase file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${DOMAIN_USECASE_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists) {
    await Folder.create({
      mainPath: DOMAIN_USECASE_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

    await generateIndex(
      `${DOMAIN_USECASE_MAIN_PATH}/index.ts`,
      FORMATTED_SCOPE
    );
  }

  await generateIndex(
    `${DOMAIN_USECASE_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    TEMPLATE_NAME
  );

  const { template } = generateDomainUsecaseTemplate({
    componentName: name,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "domain usecase generated" };
}

namespace DomainUsecaseFacade {
  export type Params = {
    name: string;
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
