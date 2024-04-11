import { controllerHandler } from "@/config/handlers";
import { generateControllerPath } from "@/utils";
import fsPromises from "node:fs/promises";
import fs from "node:fs";

describe("#Integration Controller Handler", () => {
  afterEach(async () => {
    await fsPromises.rm("test/integration/temp/src", {
      recursive: true,
    });
  });

  it("should generate a Controller on success", async () => {
    const data = { name: "GetDog", scope: "Animal" };
    await controllerHandler(data);

    const MAIN_PATH = generateControllerPath();

    const controllerPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-controller.ts`;
    const controllerIndexScopePath = `${MAIN_PATH}/index.ts`;
    const controllerIndexPath = `${MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;

    const controllerResult = fs.existsSync(controllerPath);
    const controllerIndexScopeResult = fs.existsSync(controllerIndexScopePath);
    const controllerIndexResult = fs.existsSync(controllerIndexPath);
    const expected = true;

    expect(controllerResult).toStrictEqual(expected);
    expect(controllerIndexScopeResult).toStrictEqual(expected);
    expect(controllerIndexResult).toStrictEqual(expected);
  });
});
