import { File, Folder, FormatString, generateDataProtocolPath } from "@/utils";
import { generateDataProtocolTemplate } from "@/templates";
import { generateIndex } from "./utils";

export async function generateDataProtocolFacade({
  name,
  scope,
  protocolType,
}: DataProtocolFacade.Params): DataProtocolFacade.Result {
  if (!protocolType) throw new Error("Você deve informar o tipo de protocol");

  const DATA_PROTOCOL_MAIN_PATH = generateDataProtocolPath(protocolType);
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = FormatString.convertToKebabCase(name);

  const TEMPLATE_FILE_PATH =
    protocolType === "db"
      ? `${DATA_PROTOCOL_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}-repository.ts`
      : `${DATA_PROTOCOL_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}-service.ts`;

  const templateFileExists = File.verifyExists({
    file: TEMPLATE_FILE_PATH,
  });
  if (templateFileExists)
    return { type: "info", message: "Data protocol file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${DATA_PROTOCOL_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists) {
    await Folder.create({
      mainPath: DATA_PROTOCOL_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

    await generateIndex(`${DATA_PROTOCOL_MAIN_PATH}/index.ts`, FORMATTED_SCOPE);
  }

  const indexContent =
    protocolType === "db"
      ? `${TEMPLATE_NAME}-repository`
      : `${TEMPLATE_NAME}-service`;
  await generateIndex(
    `${DATA_PROTOCOL_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    indexContent
  );

  const { template } = generateDataProtocolTemplate({
    componentName: name,
    componentType: protocolType,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "data protocol generated" };
}

namespace DataProtocolFacade {
  export type Params = {
    name: string;
    protocolType?: "db" | "http";
    scope: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
