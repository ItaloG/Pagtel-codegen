import { FormatString } from "@/utils";

const upperCaseComponentNameAnchor = "$$upperCaseComponentName";
const lowerCaseComponentNameAnchor = "$$lowerCaseComponentName";

const USECASE_TEMPLATES = {
  db: `
import { $$upperCaseComponentNameRepository } from '@/data/protocols/db';
import { $$upperCaseComponentName } from '@/domain/usecases';

export class Db$$upperCaseComponentName implements $$upperCaseComponentName {
  constructor(private readonly $$lowerCaseComponentNameRepository: $$upperCaseComponentNameRepository) {}
}`,
  http: `
import { $$upperCaseComponentNameService } from '@/data/protocols/http';
import { $$upperCaseComponentName } from '@/domain/usecases';

export class Http$$upperCaseComponentName implements $$upperCaseComponentName {
  constructor(private readonly $$lowerCaseComponentNameService: $$upperCaseComponentNameService) {}
}`,
  mq: `
import { PublishInExchangeService } from '@/data/protocols/mq';
import { $$upperCaseComponentName } from '@/domain/usecases';

export class Mq$$upperCaseComponentName implements $$upperCaseComponentName {
  constructor(private readonly publishInExchangeService: PublishInExchangeService) {}
}`,
};

const USECASE_TYPES = ["db", "http", "mq"];

export function generateDataUsecaseTemplate({
  componentName,
  componentType,
}: DataUsecaseTemplate.Params): DataUsecaseTemplate.Result {
  if (!USECASE_TYPES.includes(componentType))
    throw new Error("Invalid component type");

  const template = USECASE_TEMPLATES[componentType];

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

namespace DataUsecaseTemplate {
  export type Params = {
    componentName: string;
    componentType: "db" | "http" | "mq";
  };

  export type Result = {
    template: string;
  };
}
