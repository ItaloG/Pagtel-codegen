export const jobTemplateMock = `
import { CreateExample, ErrorHandler } from '@/domain/usecases';
import { Job } from '@/job/protocols';

export class CreateExampleJob implements Job {
  constructor(
    private readonly createExample: CreateExample,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    _payload: Job.Payload,
    _state: Job.State,
    next: Job.Next
  ): Job.Result {
    try {
      throw new Error('CreateExampleJob not implemented')
      return next();
    } catch (error) {
      await this.errorHandler.handle(error);
    }
  }
}`;
