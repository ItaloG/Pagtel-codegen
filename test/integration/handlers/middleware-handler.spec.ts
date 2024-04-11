import { middlewareHandler } from "@/config/handlers";
import { generateDomainUsecasePath, generateMiddlewarePath } from "@/utils";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

describe("#Integration Middleware Handler", () => {
  afterEach(async () => {
    await fsPromises.rm("test/integration/temp/src", {
      recursive: true,
    });
  });

  it("should generate a Middleware and a Domain Usecase on success", async () => {
    const data = { name: "GetDog", scope: "Animal" };
    await middlewareHandler(data);

    const MIDDLEWARE_MAIN_PATH = generateMiddlewarePath();
    const DOMAIN_MAIN_PATH = generateDomainUsecasePath();

    const middlewareTemplatePath = `${MIDDLEWARE_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-middleware.ts`;
    const middlewareIndexScopePath = `${MIDDLEWARE_MAIN_PATH}/index.ts`;
    const middlewareIndexPath = `${MIDDLEWARE_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const middlewareResult = fs.existsSync(middlewareTemplatePath);
    const middlewareIndexScopeResult = fs.existsSync(middlewareIndexScopePath);
    const middlewareIndexResult = fs.existsSync(middlewareIndexPath);
    const expected = true;

    expect(middlewareResult).toStrictEqual(expected);
    expect(middlewareIndexScopeResult).toStrictEqual(expected);
    expect(middlewareIndexResult).toStrictEqual(expected);

    const domainPath = `${DOMAIN_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog.ts`;
    const domainIndexScopePath = `${DOMAIN_MAIN_PATH}/index.ts`;
    const domainIndexPath = `${DOMAIN_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const domainTemplateResult = fs.existsSync(domainPath);
    const domainIndexScopeResult = fs.existsSync(domainIndexScopePath);
    const domainIndexResult = fs.existsSync(domainIndexPath);
    const domainExpected = true;

    expect(domainTemplateResult).toStrictEqual(domainExpected);
    expect(domainIndexScopeResult).toStrictEqual(domainExpected);
    expect(domainIndexResult).toStrictEqual(domainExpected);
  });
});
