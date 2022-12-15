export class FormatString {
  protected static transform({
    string,
    upperCase = true,
  }: Transform.Params): Transform.Result {
    const [first, ...rest] = string;

    if (!first) return "";

    const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase();

    return [firstLetter, ...rest].join("");
  }

  static convertToKebabCase(string: string): string {
    const formattedFirstLetter = this.transform({ string, upperCase: false });
    return formattedFirstLetter.replace(/(?=[A-Z])/g, "-").toLowerCase();
  }

  static upperCaseFirstLetter(string: string) {
    return this.transform({ string });
  }

  static lowerCaseFirstLetter(string: string) {
    return this.transform({ string, upperCase: false });
  }
}

namespace Transform {
  export type Params = {
    string: string;
    upperCase?: boolean;
  };
  export type Result = string;
}
