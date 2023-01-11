import { generateFactoryPath } from "@/utils";

describe("#Constants", () => {
  afterAll(() => {
    process.env.NODE_ENV = "test";
  });

  test('#generateFactoryPath should return a "test path" if environment is test', () => {
    const expected = "test/integration/temp/src/main/factories/any_type";
    const result = generateFactoryPath("any_type");
    expect(result).toStrictEqual(expected);
  });

  test('#generateFactoryPath should return a "production path" if environment is production', () => {
    process.env.NODE_ENV = "dev";
    const expected = "src/main/factories/any_types";
    const result = generateFactoryPath("any_type");
    expect(result).toStrictEqual(expected);
  });
});
