import { FormatString } from "@/utils";

describe("#FormatString", () => {
  test("#convertToKebabCase should convert a string to kebabCase", () => {
    const data = "HelloMyWord";
    const expected = "hello-my-word";
    const result = FormatString.convertToKebabCase(data);
    expect(result).toEqual(expected);
  });

  test("#upperCaseFirstLetter should transform the first letter in upperCase", () => {
    const data = "hello";
    const expected = "Hello";
    const result = FormatString.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test("#lowerCaseFirstLetter should transform the first letter in lowerCase", () => {
    const data = "Hello";
    const expected = "hello";
    const result = FormatString.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test("#convertToSnakeCase should convert a string to snakeCase", () => {
    const data = "HelloMyWord";
    const expected = "hello_my_word";
    const result = FormatString.convertToSnakeCase(data);
    expect(result).toEqual(expected);
  });

  test("#convertToKebabCase given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = FormatString.convertToKebabCase(data);
    expect(result).toStrictEqual(expected);
  });

  test("#lowerCaseFirstLetter given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = FormatString.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test("#upperCaseFirstLetter given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = FormatString.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test("#convertToSnakeCase given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = FormatString.convertToSnakeCase(data);
    expect(result).toStrictEqual(expected);
  });
});
