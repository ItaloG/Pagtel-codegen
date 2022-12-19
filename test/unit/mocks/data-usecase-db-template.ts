export const dataUsecaseDbTemplateMock = `
import { CreateExampleRepository } from '@/data/protocols/db';
import { CreateExample } from '@/domain/usecases';

export class DbCreateExample implements CreateExample {
  constructor(private readonly createExampleRepository: CreateExampleRepository) {}
}`;
