import {
  generateControllerFacade,
  generateDomainUsecaseFacade,
  generateFactoryFacade,
  generateJobFacade,
  generateMiddlewareFacade,
} from "@/facades";

export async function factoryHandler({
  factoryType,
  name,
  scope,
}: Params): Result {
  const promises = [];

  promises.push(generateFactoryFacade({ name, scope, factoryType }));

  if (factoryType === "job") promises.push(generateJobFacade({ name, scope }));
  if (factoryType === "middleware") {
    promises.push(generateMiddlewareFacade({ name, scope }));
    promises.push(generateDomainUsecaseFacade({ name, scope }));
  } else promises.push(generateControllerFacade({ name, scope }));

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  factoryType: "middleware" | "controller" | "job";
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
