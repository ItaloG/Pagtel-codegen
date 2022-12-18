import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";
const componentMethodAnchor = "$$componentMethod";

const template = `
export interface $$componentName {
  $$componentMethod(params: $$componentName.Params): $$componentName.Result;
}

export namespace $$componentName {
  export type Params = unknown;
  export type Result = unknown;
  export enum Exceptions {}
}`;

export function generateDomainUsecaseTemplate({
  componentName,
  componentMethod,
}: DomainUsecaseTemplate.Params): DomainUsecaseTemplate.Result {
  const templateFill = template
    .replaceAll(
      componentNameAnchor,
      FormatString.upperCaseFirstLetter(componentName)
    )
    .replaceAll(
      componentMethodAnchor,
      FormatString.lowerCaseFirstLetter(componentMethod)
    );

  return {
    template: templateFill,
  };
}

namespace DomainUsecaseTemplate {
  export type Params = {
    componentName: string;
    componentMethod: string;
  };
  export type Result = {
    template: string;
  };
}
