import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateDomainUsecaseFacade } from "@/facades";
import { generateDomainUsecasePath } from "@/utils";

describe("#Integration Domain Usecase Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a domain usecase", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    await generateDomainUsecaseFacade({
      ...data,
    });

    const MAIN_PATH = generateDomainUsecasePath();

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog.ts`;
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
