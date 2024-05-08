import { generateDataProtocolFacade, generateServiceFacade } from "@/facades";

export async function serviceHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateServiceFacade({ name, scope }));
  promises.push(
    generateDataProtocolFacade({ name, scope, protocolType: "http" })
  );

  return Promise.all(promises);
}

type Params = {
  name: string;
  scope: string;
};

type Result = Promise<
  { type: "info" | "error" | "success"; message: string }[]
>;
