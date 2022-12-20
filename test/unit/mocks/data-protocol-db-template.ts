export const dataProtocolDbTemplateMock = `
export interface CreateExampleRepository {
  unknown(
    params: CreateExampleRepository.Params
  ): CreateExampleRepository.Result;
}

export namespace CreateExampleRepository {
  export type Params = unknown;
  export type Result = unknown;
}`;
