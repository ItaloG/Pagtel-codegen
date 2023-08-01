import { FormatString } from "@/utils";

const upperCaseComponentNameAnchor = "$$upperCaseComponentName";
const lowerCaseComponentNameAnchor = "$$lowerCaseComponentName";

const template = `
import { $$upperCaseComponentName, ErrorHandler } from '@/domain/usecases';
import { Middleware } from '@/presentation/protocols';
import { serverError } from '@/presentation/utils';

export class $$upperCaseComponentNameMiddleware implements Middleware {
  constructor(
    private readonly $$lowerCaseComponentName: $$upperCaseComponentName,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    _httpRequest: Middleware.HttpRequest,
    [state, setState]: Middleware.State,
    next: Middleware.Next
  ): Middleware.Result {
    try {
      throw new Error('$$upperCaseComponentNameMiddleware not implemented')
      return next();
    } catch (error) {
      await this.errorHandler.handle(error);
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}`;

export function generateMiddlewareTemplate({
  componentName,
}: MiddlewareTemplate.Params): MiddlewareTemplate.Result {
  const templateFill = template
    .replaceAll(
      upperCaseComponentNameAnchor,
      FormatString.upperCaseFirstLetter(componentName)
    )
    .replaceAll(
      lowerCaseComponentNameAnchor,
      FormatString.lowerCaseFirstLetter(componentName)
    );

  return {
    template: templateFill,
  };
}

namespace MiddlewareTemplate {
  export type Params = {
    componentName: string;
  };
  export type Result = {
    template: string;
  };
}
