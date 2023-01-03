import { ValidateString } from "@/utils";

describe("#ValidateString", () => {
  test("#validateSpecialCharacter should return true if string don't has special character", () => {
    const data = "Hello";
    const expected = true;
    const result = ValidateString.validateSpecialCharacter(data);
    expect(result).toEqual(expected);
  });

  test("#validateSpecialCharacter should return false if string has special character", () => {
    const data = "H1el4lo!";
    const expected = false;
    const result = ValidateString.validateSpecialCharacter(data);
    expect(result).toEqual(expected);
  });

  test("#validateHasWord should return true if string has the matchWord", () => {
    const data = "Hello World";
    const matchWord = "World";
    const expected = true;
    const result = ValidateString.validateHasWord(data, matchWord);
    expect(result).toEqual(expected);
  });

  test("#validateHasWord should return false if string don't has the matchWord", () => {
    const data = "Hello World";
    const matchWord = "Word";
    const expected = false;
    const result = ValidateString.validateHasWord(data, matchWord);
    expect(result).toEqual(expected);
  });
});
