export class ValidateString {
  static validateSpecialCharacter(string: string): boolean {
    if (string.match(/\d|\W/)) return false;
    return true;
  }

  static validateHasWord(string: string, matchWord: string): boolean {
    return string.includes(matchWord);
  }
}
