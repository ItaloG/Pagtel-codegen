import { FormatString } from "@/utils";

const upperCaseComponentNameAnchor = "$$upperCaseComponentName";
const lowerCaseComponentNameAnchor = "$$lowerCaseComponentName";

const template = `
import { $$upperCaseComponentName, ErrorHandler } from '@/domain/usecases';
import { Job } from '@/job/protocols';

export class $$upperCaseComponentNameJob implements Job {
  constructor(
    private readonly $$lowerCaseComponentName: $$upperCaseComponentName,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    _payload: Job.Payload,
    _state: Job.State,
    next: Job.Next
  ): Job.Result {
    try {
      throw new Error('$$upperCaseComponentNameJob not implemented')
      return next();
    } catch (error) {
      await this.errorHandler.handle(error);
    }
  }
}`;

export function generateJobTemplate({
  componentName,
}: JobTemplate.Params): JobTemplate.Result {
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

namespace JobTemplate {
  export type Params = {
    componentName: string;
  };
  export type Result = {
    template: string;
  };
}
