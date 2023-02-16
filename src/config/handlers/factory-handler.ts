import {
  generateControllerFacade,
  generateDomainUsecaseFacade,
  generateFactoryFacade,
  generateMiddlewareFacade,
} from "@/facades";

export async function factoryHandler({
  factoryType,
  name,
  scope,
}: Params): Result {
  const promises = [];

  promises.push(generateFactoryFacade({ name, scope, factoryType }));

  if (factoryType === "middleware") {
    promises.push(generateMiddlewareFacade({ name, scope }));
    promises.push(generateDomainUsecaseFacade({ name, scope }));
  } else promises.push(generateControllerFacade({ name, scope }));

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  factoryType: "middleware" | "controller";
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
