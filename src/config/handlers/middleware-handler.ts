import {
  generateDomainUsecaseFacade,
  generateMiddlewareFacade,
} from "@/facades";

export async function middlewareHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateMiddlewareFacade({ name, scope }));
  promises.push(generateDomainUsecaseFacade({ name, scope }));

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
