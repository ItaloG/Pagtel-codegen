import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";

const template = `
export interface $$componentName {
  unknown(params: $$componentName.Params): $$componentName.Result;
}

export namespace $$componentName {
  export type Params = unknown;
  export type Result = unknown;
  export enum Exceptions {}
}`;

export function generateDomainUsecaseTemplate({
  componentName,
}: DomainUsecaseTemplate.Params): DomainUsecaseTemplate.Result {
  const templateFill = template.replaceAll(
    componentNameAnchor,
    FormatString.upperCaseFirstLetter(componentName)
  );

  return {
    template: templateFill,
  };
}

namespace DomainUsecaseTemplate {
  export type Params = {
    componentName: string;
  };
  export type Result = {
    template: string;
  };
}
