import { ValidateString } from "@/utils";

describe("#ValidateString", () => {
  test("#validateSpecialCharacter should return true if string don't have special character", () => {
    const data = "Hello";
    const expected = true;
    const result = ValidateString.validateSpecialCharacter(data);
    expect(result).toEqual(expected);
  });

  test("#validateSpecialCharacter should return false if string have special character", () => {
    const data = "H1el4lo!";
    const expected = false;
    const result = ValidateString.validateSpecialCharacter(data);
    expect(result).toEqual(expected);
  });
});
