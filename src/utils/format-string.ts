export class FormatString {
  static convertToKebabCase({
    string,
  }: ConvertToKebabCase.Params): ConvertToKebabCase.Result {}
}

export namespace ConvertToKebabCase {
  export type Params = { string: string };

  export type Result = string;
}
