export const jobFactoryTemplateMock = `
import { CreateExampleJob } from '@/job';

import { makeErrorHandler } from '../../usecases';

export const makeCreateExampleJob = () => {
  return new CreateExampleJob(, makeErrorHandler());
};`;
