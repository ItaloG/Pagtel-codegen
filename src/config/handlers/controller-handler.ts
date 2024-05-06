import { generateControllerFacade } from "@/facades";

export async function controllerHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateControllerFacade({ name, scope }));

  return Promise.all(promises);
}

type Params = {
  name: string;
  scope: string;
};

type Result = Promise<
  { type: "info" | "error" | "success"; message: string }[]
>;
