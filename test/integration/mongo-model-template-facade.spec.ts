import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { generateMongoModelFacade } from "@/facades";
import { generateMongoModelPath } from "@/utils";

describe("#Integration Mongo Model Facade", () => {
  afterEach(async () => {
    await fsPromises.rm(`${__dirname}/temp/src`, {
      recursive: true,
    });
  });

  it("should generate a mongo model", async () => {
    const data = { name: "GetDog", scope: "Dog" };
    await generateMongoModelFacade({
      ...data,
    });

    const MAIN_PATH = generateMongoModelPath();

    const templatePath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-model.ts`;

    const templateResult = fs.existsSync(templatePath);
    const expected = true;

    expect(templateResult).toStrictEqual(expected);
  });
});
