import { factoryHandler } from "@/config/handlers";
import {
  generateControllerPath,
  generateDomainUsecasePath,
  generateFactoryPath,
  generateJobPath,
  generateMiddlewarePath,
} from "@/utils";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

describe("#Integration Factory Handler", () => {
  afterEach(async () => {
    await fsPromises.rm("test/integration/temp/src", {
      recursive: true,
    });
  });

  it("should generate Factory, Job and Domain usecase on success", async () => {
    const data: any = { name: "GetDog", scope: "Animal", factoryType: "job" };
    await factoryHandler(data);

    const FACTORY_MAIN_PATH = generateFactoryPath(data.factoryType);
    const JOB_MAIN_PATH = generateJobPath();
    const DOMAIN_MAIN_PATH = generateDomainUsecasePath();

    const factoryPath = `${FACTORY_MAIN_PATH}/${data.scope.toLowerCase()}/make-get-dog-job.ts`;
    const factoryIndexScopePath = `${FACTORY_MAIN_PATH}/index.ts`;
    const factoryIndexPath = `${FACTORY_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const factoryTemplateResult = fs.existsSync(factoryPath);
    const factoryIndexScopeResult = fs.existsSync(factoryIndexScopePath);
    const factoryIndexResult = fs.existsSync(factoryIndexPath);
    const factoryExpected = true;

    expect(factoryTemplateResult).toStrictEqual(factoryExpected);
    expect(factoryIndexScopeResult).toStrictEqual(factoryExpected);
    expect(factoryIndexResult).toStrictEqual(factoryExpected);

    const jobPath = `${JOB_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-job.ts`;
    const jobIndexScopePath = `${JOB_MAIN_PATH}/index.ts`;
    const jobIndexPath = `${JOB_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const jobTemplateResult = fs.existsSync(jobPath);
    const jobIndexScopeResult = fs.existsSync(jobIndexScopePath);
    const jobIndexResult = fs.existsSync(jobIndexPath);
    const jobExpected = true;

    expect(jobTemplateResult).toStrictEqual(jobExpected);
    expect(jobIndexScopeResult).toStrictEqual(jobExpected);
    expect(jobIndexResult).toStrictEqual(jobExpected);

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

  it("should generate Factory, Middleware and Domain usecase on success", async () => {
    const data: any = {
      name: "GetDog",
      scope: "Animal",
      factoryType: "middleware",
    };
    await factoryHandler(data);

    const FACTORY_MAIN_PATH = generateFactoryPath(data.factoryType);
    const MIDDLEWARE_MAIN_PATH = generateMiddlewarePath();
    const DOMAIN_MAIN_PATH = generateDomainUsecasePath();

    const factoryPath = `${FACTORY_MAIN_PATH}/${data.scope.toLowerCase()}/make-get-dog-middleware.ts`;
    const factoryIndexScopePath = `${FACTORY_MAIN_PATH}/index.ts`;
    const factoryIndexPath = `${FACTORY_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const factoryTemplateResult = fs.existsSync(factoryPath);
    const factoryIndexScopeResult = fs.existsSync(factoryIndexScopePath);
    const factoryIndexResult = fs.existsSync(factoryIndexPath);
    const factoryExpected = true;

    expect(factoryTemplateResult).toStrictEqual(factoryExpected);
    expect(factoryIndexScopeResult).toStrictEqual(factoryExpected);
    expect(factoryIndexResult).toStrictEqual(factoryExpected);

    const middlewarePath = `${MIDDLEWARE_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-middleware.ts`;
    const middlewareIndexScopePath = `${MIDDLEWARE_MAIN_PATH}/index.ts`;
    const middlewareIndexPath = `${MIDDLEWARE_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const middlewareTemplateResult = fs.existsSync(middlewarePath);
    const middlewareIndexScopeResult = fs.existsSync(middlewareIndexScopePath);
    const middlewareIndexResult = fs.existsSync(middlewareIndexPath);
    const middlewareExpected = true;

    expect(middlewareTemplateResult).toStrictEqual(middlewareExpected);
    expect(middlewareIndexScopeResult).toStrictEqual(middlewareExpected);
    expect(middlewareIndexResult).toStrictEqual(middlewareExpected);

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

  it("should generate Factory and Controller on success", async () => {
    const data: any = {
      name: "GetDog",
      scope: "Animal",
      factoryType: "controller",
    };
    await factoryHandler(data);

    const FACTORY_MAIN_PATH = generateFactoryPath(data.factoryType);
    const CONTROLLER_MAIN_PATH = generateControllerPath();

    const factoryPath = `${FACTORY_MAIN_PATH}/${data.scope.toLowerCase()}/make-get-dog-controller.ts`;
    const factoryIndexScopePath = `${FACTORY_MAIN_PATH}/index.ts`;
    const factoryIndexPath = `${FACTORY_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const factoryTemplateResult = fs.existsSync(factoryPath);
    const factoryIndexScopeResult = fs.existsSync(factoryIndexScopePath);
    const factoryIndexResult = fs.existsSync(factoryIndexPath);
    const factoryExpected = true;

    expect(factoryTemplateResult).toStrictEqual(factoryExpected);
    expect(factoryIndexScopeResult).toStrictEqual(factoryExpected);
    expect(factoryIndexResult).toStrictEqual(factoryExpected);

    const controllerPath = `${CONTROLLER_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-controller.ts`;
    const controllerIndexScopePath = `${CONTROLLER_MAIN_PATH}/index.ts`;
    const controllerIndexPath = `${CONTROLLER_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const controllerTemplateResult = fs.existsSync(controllerPath);
    const controllerIndexScopeResult = fs.existsSync(controllerIndexScopePath);
    const controllerIndexResult = fs.existsSync(controllerIndexPath);
    const controllerExpected = true;

    expect(controllerTemplateResult).toStrictEqual(controllerExpected);
    expect(controllerIndexScopeResult).toStrictEqual(controllerExpected);
    expect(controllerIndexResult).toStrictEqual(controllerExpected);
  });
});
