import {
  generateDomainUsecaseFacade,
  generateMiddlewareFacade,
} from "@/facades";

export async function middlewareHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateMiddlewareFacade({ name, scope }));
  promises.push(generateDomainUsecaseFacade({ name, scope }));

  return Promise.all(promises);
}

type Params = {
  name: string;
  scope: string;
};

type Result = Promise<
  { type: "info" | "error" | "success"; message: string }[]
>;
