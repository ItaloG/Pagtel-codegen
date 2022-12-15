export class ValidateString {
  static validateSpecialCharacter(string: string): boolean {
    if (string.match(/\d|\W/)) return false;
    return true;
  }
}
