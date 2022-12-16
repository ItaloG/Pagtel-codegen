export const middlewareFactoryTemplateMock = `
import { ExampleMiddleware } from '@/presentation/middlewares';

import { makeErrorHandler } from '../../usecases';

export const makeExampleMiddleware = () => {
  return new ExampleMiddleware(, makeErrorHandler());
};`;
