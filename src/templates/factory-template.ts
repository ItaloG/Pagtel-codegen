import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";

const FACTORY_TEMPLATES = {
  middleware: `
import { $$componentNameMiddleware } from '@/presentation/middlewares';

import { makeErrorHandler } from '../../usecases';

export const make$$componentNameMiddleware = () => {
  return new $$componentNameMiddleware(, makeErrorHandler());
};`,
  controller: `
import { $$componentNameController } from '@/presentation/controllers';

export const make$$componentNameController = () =>
  new $$componentNameController();`,
  job: `
import { $$componentNameJob } from '@/job';

import { makeErrorHandler } from '../../usecases';

export const make$$componentNameJob = () => {
  return new $$componentNameJob(, makeErrorHandler());
};`,
};

const FACTORY_TYPES = ["middleware", "controller", "job"];

export function generateFactoryTemplate({
  componentName,
  componentType,
}: FactoryTemplate.Params): FactoryTemplate.Result {
  if (!FACTORY_TYPES.includes(componentType))
    throw new Error("Invalid component type");

  const template = FACTORY_TEMPLATES[componentType];

  const templateFill = template.replaceAll(
    componentNameAnchor,
    FormatString.upperCaseFirstLetter(componentName)
  );

  return {
    template: templateFill,
  };
}

namespace FactoryTemplate {
  export type Params = {
    componentName: string;
    componentType: "middleware" | "controller" | "job";
  };

  export type Result = {
    template: string;
  };
}
