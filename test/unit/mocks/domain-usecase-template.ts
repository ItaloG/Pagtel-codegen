export const domainUsecaseTemplateMock = `
export interface CreateExample {
  unknown(params: CreateExample.Params): CreateExample.Result;
}

export namespace CreateExample {
  export type Params = unknown;
  export type Result = unknown;
  export enum Exceptions {}
}`;
