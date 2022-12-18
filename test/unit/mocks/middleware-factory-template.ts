export const middlewareFactoryTemplateMock = `
import { CreateExampleMiddleware } from '@/presentation/middlewares';

import { makeErrorHandler } from '../../usecases';

export const makeCreateExampleMiddleware = () => {
  return new CreateExampleMiddleware(, makeErrorHandler());
};`;
