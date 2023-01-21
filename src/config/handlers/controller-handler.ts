import { generateControllerFacade } from "@/facades";

export async function controllerHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateControllerFacade({ name, scope }));

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
