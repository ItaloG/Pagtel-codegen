export const dataUsecaseHttpTemplateMock = `
import { CreateExampleService } from '@/data/protocols/http';
import { CreateExample } from '@/domain/usecases';

export class HttpCreateExample implements CreateExample {
  constructor(private readonly createExampleService: CreateExampleService) {}
}`;
