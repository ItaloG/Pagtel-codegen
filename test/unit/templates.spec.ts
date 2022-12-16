import { generateFactoryTemplate } from "@/templates";
import {
  middlewareFactoryTemplateMock,
  controllerFactoryTemplateMock,
} from "./mocks";

describe("#Template Generator", () => {
  const componentName = "example";

  test("#generateFactoryTemplate should generate middleware factory template", () => {
    const expected = {
      template: middlewareFactoryTemplateMock,
    };

    const result = generateFactoryTemplate({
      componentName,
      componentType: "middleware",
    });
    expect(result).toStrictEqual(expected);
  });

  test("#generateFactoryTemplate should generate controller factory template", () => {
    const expected = {
      template: controllerFactoryTemplateMock,
    };

    const result = generateFactoryTemplate({
      componentName,
      componentType: "controller",
    });
    expect(result).toStrictEqual(expected);
  });

  test("#generateFactoryTemplate should throw a error if a invalid componentType has been passed", () => {
    const expected = "Invalid component type";

    expect(() =>
      generateFactoryTemplate({
        componentName,
        componentType: <any>"test",
      })
    ).toThrowError(expected);
  });
});
