import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";

const template = `
import {
  $$componentNameService as $$componentNameProtocol,
  HttpClient,
} from '@/data/protocols/http';

export class $$componentNameService implements $$componentNameProtocol {
  constructor(private readonly httpClient: HttpClient) {}
}`;

export function generateServiceTemplate({
  componentName,
}: ServiceTemplate.Params): ServiceTemplate.Result {
  const templateFill = template.replaceAll(
    componentNameAnchor,
    FormatString.upperCaseFirstLetter(componentName)
  );

  return {
    template: templateFill,
  };
}

namespace ServiceTemplate {
  export type Params = {
    componentName: string;
  };
  export type Result = {
    template: string;
  };
}
