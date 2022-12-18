export const middlewareTemplateMock = `
import { CreateExample, ErrorHandler } from '@/domain/usecases';
import { Middleware } from '@/presentation/protocols';
import { serverError } from '@/presentation/utils';

export class CreateExampleMiddleware implements Middleware {
  constructor(
    private readonly createExample: CreateExample,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    _httpRequest: Middleware.HttpRequest,
    [state, setState]: Middleware.State,
    next: Middleware.Next
  ): Middleware.Result {
    try {
      throw new Error('CreateExampleMiddleware not implemented')
      return next();
    } catch (error) {
      await this.errorHandler.handle(error, state.transactions);
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}`;
