import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";

const template = `
import { Controller } from '@/presentation/protocols';
import { ok } from '@/presentation/utils';
import { DICTIONARY, template } from '@/util';

export class $$componentNameController implements Controller {
  async handle(
    httpRequest: Controller.HttpRequest,
    state: Controller.State
  ): Controller.Result {
    return ok(template(DICTIONARY.RESPONSE.MESSAGE.OK, "ok"), {});
  }
}`;

export function generateControllerTemplate({
  componentName,
}: ControllerTemplate.Params): ControllerTemplate.Result {
  const templateFill = template.replaceAll(
    componentNameAnchor,
    FormatString.upperCaseFirstLetter(componentName)
  );

  return {
    template: templateFill,
  };
}

namespace ControllerTemplate {
  export type Params = {
    componentName: string;
  };
  export type Result = {
    template: string;
  };
}
