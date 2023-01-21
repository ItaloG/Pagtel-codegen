import { generateRepositoryTemplate } from "@/templates";
import { FormatString, generateRepositoryPath, File } from "@/utils";
import {
  generateIndex,
  validateMongodbFolder,
  validateMssqlFolder,
} from "./utils";

export async function generateRepositoryFacade({
  name,
  database,
  repositoryType,
  schema,
}: RepositoryFacade.Params): RepositoryFacade.Result {
  if (!repositoryType)
    throw new Error("Você deve informar o tipo do repository");

  const REPOSITORY_MAIN_PATH = generateRepositoryPath(repositoryType);
  const TEMPLATE_NAME = `${FormatString.convertToKebabCase(name)}-repository`;
  const SCOPE_NAME = FormatString.convertToKebabCase(name);
  const FORMATTED_SCHEMA_NAME = `${FormatString.convertToKebabCase(schema)}`;
  const FORMATTED_DATABASE_NAME = `${FormatString.convertToKebabCase(
    database
  )}`;

  const TEMPLATE_FILE_PATH =
    repositoryType === "mssql"
      ? `${REPOSITORY_MAIN_PATH}/${FORMATTED_DATABASE_NAME}/${FORMATTED_SCHEMA_NAME}`
      : `${REPOSITORY_MAIN_PATH}/${SCOPE_NAME}`;

  const templateFileExists = File.verifyExists({
    file: `${TEMPLATE_FILE_PATH}/${TEMPLATE_NAME}.ts`,
  });
  if (templateFileExists)
    return { type: "info", message: "Repository file already exists" };

  const folderValidations = {
    mongodb: validateMongodbFolder,
    mssql: validateMssqlFolder,
  };

  const data = {
    mainPath: REPOSITORY_MAIN_PATH,
    database: FORMATTED_DATABASE_NAME,
    schema: FORMATTED_SCHEMA_NAME,
    scope: SCOPE_NAME,
  };

  await folderValidations[repositoryType]({ ...data });

  await generateIndex(`${TEMPLATE_FILE_PATH}/index.ts`, TEMPLATE_NAME);

  const { template } = generateRepositoryTemplate({
    componentName: name,
    componentType: repositoryType,
  });

  await File.create({
    filePath: `${TEMPLATE_FILE_PATH}/${TEMPLATE_NAME}.ts`,
    fileContent: template,
  });

  return { type: "success", message: "repository generated" };
}

namespace RepositoryFacade {
  export type Params = {
    name: string;
    repositoryType?: "mongodb" | "mssql";
    database: string;
    schema: string;
  };
  export type Result = Promise<{ type: string; message: string }>;
}
