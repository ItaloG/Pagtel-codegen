import {
  generateFactoryTemplate,
  generateMiddlewareTemplate,
} from "@/templates";
import {
  middlewareFactoryTemplateMock,
  controllerFactoryTemplateMock,
  middlewareTemplateMock,
} from "./mocks";

describe("#Template Generator", () => {
  const componentName = "CreateExample";

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
});
