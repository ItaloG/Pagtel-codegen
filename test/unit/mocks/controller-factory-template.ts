export const controllerFactoryTemplateMock = `
import { CreateExampleController } from '@/presentation/controllers';
import { commitAll } from '@/util';

export const makeCreateExampleController = () =>
  new CreateExampleController(commitAll);`;
