import { generateDataProtocolFacade, generateServiceFacade } from "@/facades";

export async function serviceHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateServiceFacade({ name, scope }));
  promises.push(
    generateDataProtocolFacade({ name, scope, protocolType: "http" })
  );

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
