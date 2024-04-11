import { jobHandler } from "@/config/handlers";
import { generateDomainUsecasePath, generateJobPath } from "@/utils";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

describe("#Integration Job Handler", () => {
  afterEach(async () => {
    await fsPromises.rm("test/integration/temp/src", {
      recursive: true,
    });
  });

  it("should generate a Job and a Domain Usecase on success", async () => {
    const data = { name: "GetDog", scope: "Animal" };
    await jobHandler(data);

    const JOB_MAIN_PATH = generateJobPath();
    const DOMAIN_MAIN_PATH = generateDomainUsecasePath();

    const jobPath = `${JOB_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-job.ts`;
    const jobIndexScopePath = `${JOB_MAIN_PATH}/index.ts`;
    const jobIndexPath = `${JOB_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const jobResult = fs.existsSync(jobPath);
    const jobIndexScopeResult = fs.existsSync(jobIndexScopePath);
    const jobIndexResult = fs.existsSync(jobIndexPath);
    const expected = true;

    expect(jobResult).toStrictEqual(expected);
    expect(jobIndexScopeResult).toStrictEqual(expected);
    expect(jobIndexResult).toStrictEqual(expected);

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
