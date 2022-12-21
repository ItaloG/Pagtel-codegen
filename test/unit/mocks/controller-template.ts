export const controllerTemplateMock = `
import { Controller } from '@/presentation/protocols';
import { ok } from '@/presentation/utils';
import { DICTIONARY, template } from '@/util';

export class CreateExampleController implements Controller {
  async handle(
    httpRequest: Controller.HttpRequest,
    state: Controller.State
  ): Controller.Result {
    return ok(template(DICTIONARY.RESPONSE.MESSAGE.OK, "ok"), {});
  }
}`;
