import { usecaseHandler } from "@/config/handlers";
import {
  generateDataProtocolPath,
  generateDomainUsecasePath,
  generateUsecasePath,
} from "@/utils";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

describe("#Integration Usecase Handler", () => {
  afterEach(async () => {
    await fsPromises.rm("test/integration/temp/src", {
      recursive: true,
    });
  });

  it("should generate DB Usecase, Data Protocol and Domain Usecase on success", async () => {
    const data: any = { name: "GetDog", scope: "Animal", usecaseType: "db" };
    await usecaseHandler(data);

    const USECASE_MAIN_PATH = generateUsecasePath(data.usecaseType);
    const DATA_PROTOCOL_MAIN_PATH = generateDataProtocolPath(data.usecaseType);
    const DOMAIN_MAIN_PATH = generateDomainUsecasePath();

    const usecasePath = `${USECASE_MAIN_PATH}/${data.scope.toLowerCase()}/db-get-dog.ts`;
    const usecaseIndexScopePath = `${USECASE_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;
    const usecaseIndexPath = `${USECASE_MAIN_PATH}/index.ts`;

    const usecaseResult = fs.existsSync(usecasePath);
    const usecaseIndexScopeResult = fs.existsSync(usecaseIndexScopePath);
    const usecaseIndexResult = fs.existsSync(usecaseIndexPath);
    const expected = true;

    expect(usecaseResult).toStrictEqual(expected);
    expect(usecaseIndexScopeResult).toStrictEqual(expected);
    expect(usecaseIndexResult).toStrictEqual(expected);

    const dataProtocolPath = `${DATA_PROTOCOL_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-repository.ts`;
    const dataProtocolIndexScopePath = `${DATA_PROTOCOL_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;
    const dataProtocolIndexPath = `${DATA_PROTOCOL_MAIN_PATH}/index.ts`;

    const dataProtocolResult = fs.existsSync(dataProtocolPath);
    const dataProtocolIndexScopeResult = fs.existsSync(
      dataProtocolIndexScopePath
    );
    const dataProtocolIndexResult = fs.existsSync(dataProtocolIndexPath);

    expect(dataProtocolResult).toStrictEqual(expected);
    expect(dataProtocolIndexScopeResult).toStrictEqual(expected);
    expect(dataProtocolIndexResult).toStrictEqual(expected);

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

  it("should generate HTTP Usecase, Data Protocol and Domain Usecase on success", async () => {
    const data: any = { name: "GetDog", scope: "Animal", usecaseType: "http" };
    await usecaseHandler(data);

    const USECASE_MAIN_PATH = generateUsecasePath(data.usecaseType);
    const DATA_PROTOCOL_MAIN_PATH = generateDataProtocolPath(data.usecaseType);
    const DOMAIN_MAIN_PATH = generateDomainUsecasePath();

    const usecasePath = `${USECASE_MAIN_PATH}/${data.scope.toLowerCase()}/http-get-dog.ts`;
    const usecaseIndexScopePath = `${USECASE_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;
    const usecaseIndexPath = `${USECASE_MAIN_PATH}/index.ts`;

    const usecaseResult = fs.existsSync(usecasePath);
    const usecaseIndexScopeResult = fs.existsSync(usecaseIndexScopePath);
    const usecaseIndexResult = fs.existsSync(usecaseIndexPath);
    const expected = true;

    expect(usecaseResult).toStrictEqual(expected);
    expect(usecaseIndexScopeResult).toStrictEqual(expected);
    expect(usecaseIndexResult).toStrictEqual(expected);

    const dataProtocolPath = `${DATA_PROTOCOL_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-service.ts`;
    const dataProtocolIndexScopePath = `${DATA_PROTOCOL_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;
    const dataProtocolIndexPath = `${DATA_PROTOCOL_MAIN_PATH}/index.ts`;

    const dataProtocolResult = fs.existsSync(dataProtocolPath);
    const dataProtocolIndexScopeResult = fs.existsSync(
      dataProtocolIndexScopePath
    );
    const dataProtocolIndexResult = fs.existsSync(dataProtocolIndexPath);

    expect(dataProtocolResult).toStrictEqual(expected);
    expect(dataProtocolIndexScopeResult).toStrictEqual(expected);
    expect(dataProtocolIndexResult).toStrictEqual(expected);

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

  it("should generate MQ Usecase and Domain Usecase on success", async () => {
    const data: any = { name: "GetDog", scope: "Animal", usecaseType: "mq" };
    await usecaseHandler(data);

    const USECASE_MAIN_PATH = generateUsecasePath(data.usecaseType);
    const DOMAIN_MAIN_PATH = generateDomainUsecasePath();

    const usecasePath = `${USECASE_MAIN_PATH}/${data.scope.toLowerCase()}/mq-get-dog.ts`;
    const usecaseIndexScopePath = `${USECASE_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;
    const usecaseIndexPath = `${USECASE_MAIN_PATH}/index.ts`;

    const usecaseResult = fs.existsSync(usecasePath);
    const usecaseIndexScopeResult = fs.existsSync(usecaseIndexScopePath);
    const usecaseIndexResult = fs.existsSync(usecaseIndexPath);
    const expected = true;

    expect(usecaseResult).toStrictEqual(expected);
    expect(usecaseIndexScopeResult).toStrictEqual(expected);
    expect(usecaseIndexResult).toStrictEqual(expected);

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
