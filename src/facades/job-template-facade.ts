import { generateJobTemplate } from "@/templates";
import { FormatString, File, Folder, generateJobPath } from "@/utils";
import { generateIndex } from "./utils";

export async function generateJobFacade({
  name,
  scope,
}: JobFacade.Params): JobFacade.Result {
  const JOB_MAIN_PATH = generateJobPath();
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);
  const TEMPLATE_NAME = `${FormatString.convertToKebabCase(name)}-job`;
  const TEMPLATE_FILE_PATH = `${JOB_MAIN_PATH}/${FORMATTED_SCOPE}/${TEMPLATE_NAME}.ts`;

  const templateFileExists = File.verifyExists({ file: TEMPLATE_FILE_PATH });
  if (templateFileExists)
    return { type: "info", message: "Job file already exists" };

  const scopeFolderExists = Folder.verifyExists({
    folder: `${JOB_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });
  if (!scopeFolderExists) {
    await Folder.create({
      mainPath: JOB_MAIN_PATH,
      newFolder: FORMATTED_SCOPE,
    });

    await generateIndex(`${JOB_MAIN_PATH}/index.ts`, FORMATTED_SCOPE);
  }

  await generateIndex(
    `${JOB_MAIN_PATH}/${FORMATTED_SCOPE}/index.ts`,
    TEMPLATE_NAME
  );

  const { template } = generateJobTemplate({
    componentName: name,
  });

  await File.create({ filePath: TEMPLATE_FILE_PATH, fileContent: template });

  return { type: "success", message: "job generated" };
}

namespace JobFacade {
  export type Params = {
    name: string;
    scope: string;
  };
  export type Result = Promise<{
    type: "info" | "error" | "success";
    message: string;
  }>;
}
