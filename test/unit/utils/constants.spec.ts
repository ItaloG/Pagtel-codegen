import {
  generateControllerPath,
  generateFactoryPath,
  generateMiddlewarePath,
  generateRepositoryPath,
  generateServicePath,
  generateUsecasePath,
} from "@/utils";

describe("#Constants", () => {
  afterEach(() => {
    process.env.NODE_ENV = "test";
  });

  describe("#generateFactoryPath ", () => {
    it('should return a "test path" if environment is test', () => {
      const expected = "test/integration/temp/src/main/factories/any_type";
      const result = generateFactoryPath("any_type");
      expect(result).toStrictEqual(expected);
    });

    it('should return a "production path" if environment is production', () => {
      process.env.NODE_ENV = "dev";
      const expected = "src/main/factories/any_types";
      const result = generateFactoryPath("any_type");
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateMiddlewarePath", () => {
    it('should return a "test path" if environment is test', () => {
      const expected = "test/integration/temp/src/presentation/middlewares";
      const result = generateMiddlewarePath();
      expect(result).toStrictEqual(expected);
    });

    it('should return a "production path" if environment is production', () => {
      process.env.NODE_ENV = "dev";
      const expected = "src/presentation/middlewares";
      const result = generateMiddlewarePath();
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateUsecasePath", () => {
    it('should return a "test path" if environment is test', () => {
      const expected = "test/integration/temp/src/data/usecases/any_type";
      const result = generateUsecasePath("any_type");
      expect(result).toStrictEqual(expected);
    });

    it('should return a "production path" if environment is production', () => {
      process.env.NODE_ENV = "dev";
      const expected = "src/data/usecases/any_type";
      const result = generateUsecasePath("any_type");
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateRepositoryPath", () => {
    it('should return a "test path" if environment is test', () => {
      const expected = "test/integration/temp/src/infra/db/any_type";
      const result = generateRepositoryPath("any_type");
      expect(result).toStrictEqual(expected);
    });

    it('should return a "production path" if environment is production', () => {
      process.env.NODE_ENV = "dev";
      const expected = "src/infra/db/any_type";
      const result = generateRepositoryPath("any_type");
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateServicePath", () => {
    it('should return a "test path" if environment is test', () => {
      const expected = "test/integration/temp/src/infra/http/service";
      const result = generateServicePath();
      expect(result).toStrictEqual(expected);
    });

    it('should return a "production path" if environment is production', () => {
      process.env.NODE_ENV = "dev";
      const expected = "src/infra/http/service";
      const result = generateServicePath();
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateControllerPath", () => {
    it('should return a "test path" if environment is test', () => {
      const expected = "test/integration/temp/src/presentation/controllers";
      const result = generateControllerPath();
      expect(result).toStrictEqual(expected);
    });

    it('should return a "production path" if environment is production', () => {
      process.env.NODE_ENV = "dev";
      const expected = "src/presentation/controllers";
      const result = generateControllerPath();
      expect(result).toStrictEqual(expected);
    });
  });
});
