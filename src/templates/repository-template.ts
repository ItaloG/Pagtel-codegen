import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";
const kebabCaseComponentNameAnchor = "$$kebabCaseComponentName";

const REPOSITORY_TEMPLATES = {
  mssql: `
import { Repository } from '@/infra/db/mssql/util';

export class $$componentNameRepository extends Repository {}`,
  mongo: `
import { $$componentNameModel } from './$$kebabCaseComponentName-model';

export class $$componentNameRepository {}`,
};

const REPOSITORY_TYPES = ["mssql", "mongo"];

export function generateRepositoryTemplate({
  componentName,
  componentType,
}: RepositoryTemplate.Params): RepositoryTemplate.Result {
  if (!REPOSITORY_TYPES.includes(componentType))
    throw new Error("Invalid component type");

  const template = REPOSITORY_TEMPLATES[componentType];

  const templateFill = template
    .replaceAll(
      componentNameAnchor,
      FormatString.upperCaseFirstLetter(componentName)
    )
    .replaceAll(
      kebabCaseComponentNameAnchor,
      FormatString.convertToKebabCase(componentName)
    );

  return {
    template: templateFill,
  };
}

namespace RepositoryTemplate {
  export type Params = {
    componentName: string;
    componentType: "mssql" | "mongo";
  };

  export type Result = {
    template: string;
  };
}
