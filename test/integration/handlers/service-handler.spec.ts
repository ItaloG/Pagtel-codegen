import { serviceHandler } from "@/config/handlers";
import { generateDataProtocolPath, generateServicePath } from "@/utils";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

describe("#Integration Service Handler", () => {
  afterEach(async () => {
    await fsPromises.rm("test/integration/temp/src", {
      recursive: true,
    });
  });

  it("should generate a Service and a Data Protocol on success", async () => {
    const data = { name: "GetDog", scope: "Animal" };
    await serviceHandler(data);

    const SERVICE_MAIN_PATH = generateServicePath();
    const DATA_PROTOCOL_MAIN_PATH = generateDataProtocolPath("http");

    const servicePath = `${SERVICE_MAIN_PATH}/${data.scope.toLowerCase()}/get-dog-service.ts`;
    const serviceIndexScopePath = `${SERVICE_MAIN_PATH}/${data.scope.toLowerCase()}/index.ts`;
    const serviceIndexPath = `${SERVICE_MAIN_PATH}/index.ts`;

    const serviceResult = fs.existsSync(servicePath);
    const serviceIndexScopeResult = fs.existsSync(serviceIndexScopePath);
    const serviceIndexResult = fs.existsSync(serviceIndexPath);
    const expected = true;

    expect(serviceResult).toStrictEqual(expected);
    expect(serviceIndexScopeResult).toStrictEqual(expected);
    expect(serviceIndexResult).toStrictEqual(expected);

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
  });
});
