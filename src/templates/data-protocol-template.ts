import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";

const PROTOCOL_TEMPLATES = {
  db: `
export interface $$componentNameRepository {
  unknown(
    params: $$componentNameRepository.Params
  ): $$componentNameRepository.Result;
}

export namespace $$componentNameRepository {
  export type Params = unknown;
  export type Result = unknown;
}`,
  http: `
export interface $$componentNameService {
  unknown(params: $$componentNameService.Params): $$componentNameService.Result;
}

export namespace $$componentNameService {
  export type Params = unknown;
  export type Result = unknown;
}`,
};

const PROTOCOL_TYPES = ["db", "http"];

export function generateDataProtocolTemplate({
  componentName,
  componentType,
}: DataProtocolTemplate.Params): DataProtocolTemplate.Result {
  if (!PROTOCOL_TYPES.includes(componentType))
    throw new Error("Invalid component type");

  const template = PROTOCOL_TEMPLATES[componentType];

  const templateFill = template.replaceAll(
    componentNameAnchor,
    FormatString.upperCaseFirstLetter(componentName)
  );

  return {
    template: templateFill,
  };
}

namespace DataProtocolTemplate {
  export type Params = { componentName: string; componentType: "db" | "http" };

  export type Result = { template: string };
}
