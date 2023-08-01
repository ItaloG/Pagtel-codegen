import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateJobFacade } from "@/facades";
import { generateJobPath } from "@/utils";

describe("#Integration Job Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a middleware", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    await generateJobFacade({
      ...data,
    });

    const MAIN_PATH = generateJobPath();

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-job.ts`;
    const indexScopePath = `${MAIN_PATH}/index.ts`;
    const indexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const templateResult = fs.existsSync(templatePath);
    const indexScopeResult = fs.existsSync(indexScopePath);
    const indexResult = fs.existsSync(indexPath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
    expect(indexScopeResult).toStrictEqual(expected);
    expect(indexResult).toStrictEqual(expected);
  });
});
