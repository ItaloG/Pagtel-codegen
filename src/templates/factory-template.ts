import { GetExampleMiddleware } from '@/presentation/middlewares';

import { makeErrorHandler } from "../../usecases";

export const makeGetExampleMiddleware = () => {
  const usecase = {};
  return new GetExampleMiddleware(usecase, makeErrorHandler());
};
