export const serviceTemplateMock = `
import {
  CreateExampleService as CreateExampleProtocol,
  HttpClient,
} from '@/data/protocols/http';

export class CreateExampleService implements CreateExampleProtocol {
  constructor(private readonly httpClient: HttpClient) {}
}`;
