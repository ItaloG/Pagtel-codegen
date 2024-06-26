import {
  generateControllerTemplate,
  generateDataProtocolTemplate,
  generateDataUsecaseTemplate,
  generateDomainUsecaseTemplate,
  generateFactoryTemplate,
  generateJobTemplate,
  generateMiddlewareTemplate,
  generateRepositoryTemplate,
  generateServiceTemplate,
} from "@/templates";
import { generateMongoModelTemplate } from "@/templates/mongo-model-template";
import {
  controllerFactoryTemplateMock,
  controllerTemplateMock,
  dataProtocolDbTemplateMock,
  dataProtocolHttpTemplateMock,
  dataUsecaseDbTemplateMock,
  dataUsecaseHttpTemplateMock,
  dataUsecaseMqTemplateMock,
  domainUsecaseTemplateMock,
  jobFactoryTemplateMock,
  jobTemplateMock,
  middlewareFactoryTemplateMock,
  middlewareTemplateMock,
  mongoModelTemplateMock,
  repositoryMongoTemplateMock,
  repositoryMssqlTemplateMock,
  serviceTemplateMock,
} from "./mocks";
import { dataUsecaseOtherTemplateMock } from "./mocks/data-usecase-other-template";

describe("#Template Generator", () => {
  const componentName = "createExample";

  describe("#generateFactoryTemplate", () => {
    it("should generate middleware factory template", () => {
      const expected = {
        template: middlewareFactoryTemplateMock,
      };

      const result = generateFactoryTemplate({
        componentName,
        componentType: "middleware",
      });
      expect(result).toStrictEqual(expected);
    });

    it("should generate controller factory template", () => {
      const expected = {
        template: controllerFactoryTemplateMock,
      };

      const result = generateFactoryTemplate({
        componentName,
        componentType: "controller",
      });
      expect(result).toStrictEqual(expected);
    });

    it("should generate job factory template", () => {
      const expected = {
        template: jobFactoryTemplateMock,
      };

      const result = generateFactoryTemplate({
        componentName,
        componentType: "job",
      });
      expect(result).toStrictEqual(expected);
    });

    it("should throw a error if a invalid componentType has been passed", () => {
      const expected = "Invalid component type";

      expect(() =>
        generateFactoryTemplate({
          componentName,
          componentType: <any>"test",
        })
      ).toThrowError(expected);
    });
  });

  describe("#generateMiddlewareTemplate", () => {
    it("should generate a middleware template", () => {
      const expected = {
        template: middlewareTemplateMock,
      };
      const result = generateMiddlewareTemplate({ componentName });
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateDomainUsecaseTemplate", () => {
    it("should generate a domain usecase template", () => {
      const expected = {
        template: domainUsecaseTemplateMock,
      };

      const result = generateDomainUsecaseTemplate({
        componentName,
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateDataUsecaseTemplate", () => {
    it("should generate a data usecase db template", () => {
      const expected = {
        template: dataUsecaseDbTemplateMock,
      };

      const result = generateDataUsecaseTemplate({
        componentName,
        componentType: "db",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should generate a data usecase http template", () => {
      const expected = {
        template: dataUsecaseHttpTemplateMock,
      };

      const result = generateDataUsecaseTemplate({
        componentName,
        componentType: "http",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should generate a data usecase mq template", () => {
      const expected = {
        template: dataUsecaseMqTemplateMock,
      };

      const result = generateDataUsecaseTemplate({
        componentName,
        componentType: "mq",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should generate a data usecase other template", () => {
      const expected = {
        template: dataUsecaseOtherTemplateMock,
      };

      const result = generateDataUsecaseTemplate({
        componentName,
        componentType: "other",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should throw a error if a invalid componentType has been passed", () => {
      const expected = "Invalid component type";

      expect(() =>
        generateDataUsecaseTemplate({
          componentName,
          componentType: <any>"test",
        })
      ).toThrowError(expected);
    });
  });

  describe("#generateRepositoryTemplate", () => {
    it("should generate a repository mssql template", () => {
      const expected = {
        template: repositoryMssqlTemplateMock,
      };

      const result = generateRepositoryTemplate({
        componentName,
        componentType: "mssql",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should generate a repository mongo template", () => {
      const expected = {
        template: repositoryMongoTemplateMock,
      };

      const result = generateRepositoryTemplate({
        componentName,
        componentType: "mongodb",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should throw a error if a invalid componentType has been passed", () => {
      const expected = "Invalid component type";

      expect(() =>
        generateRepositoryTemplate({
          componentName,
          componentType: <any>"test",
        })
      ).toThrowError(expected);
    });
  });

  describe("#generateDataProtocolTemplate", () => {
    it("should generate a data protocol db template", () => {
      const expected = {
        template: dataProtocolDbTemplateMock,
      };

      const result = generateDataProtocolTemplate({
        componentName,
        componentType: "db",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should generate a data protocol http template", () => {
      const expected = {
        template: dataProtocolHttpTemplateMock,
      };

      const result = generateDataProtocolTemplate({
        componentName,
        componentType: "http",
      });

      expect(result).toStrictEqual(expected);
    });

    it("should throw a error if a invalid componentType has been passed", () => {
      const expected = "Invalid component type";

      expect(() =>
        generateDataProtocolTemplate({
          componentName,
          componentType: <any>"test",
        })
      ).toThrowError(expected);
    });
  });

  describe("#generateServiceTemplate", () => {
    it("should generate a service template", () => {
      const expected = {
        template: serviceTemplateMock,
      };

      const result = generateServiceTemplate({
        componentName,
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateControllerTemplate", () => {
    it("should generate a controller template", () => {
      const expected = {
        template: controllerTemplateMock,
      };

      const result = generateControllerTemplate({
        componentName,
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe("generateMongoModelTemplate", () => {
    it("should generate a mongo model template", () => {
      const expected = {
        template: mongoModelTemplateMock,
      };

      const result = generateMongoModelTemplate({
        componentName,
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe("#generateJobTemplate", () => {
    it("should generate a job template", () => {
      const expected = {
        template: jobTemplateMock,
      };
      const result = generateJobTemplate({ componentName });
      expect(result).toStrictEqual(expected);
    });
  });
});
