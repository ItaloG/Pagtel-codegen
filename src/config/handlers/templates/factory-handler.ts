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

  switch (factoryType) {
    case "job":
      promises.push(generateJobFacade({ name, scope }));
      promises.push(generateDomainUsecaseFacade({ name, scope }));
      break;
    case "middleware":
      promises.push(generateMiddlewareFacade({ name, scope }));
      promises.push(generateDomainUsecaseFacade({ name, scope }));
      break;
    case "controller":
      promises.push(generateControllerFacade({ name, scope }));
      break;

    default:
      promises.push(Promise.reject(new Error("Factory Type not allowed")));
      break;
  }

  return Promise.all(promises);
}

type Params = {
  name: string;
  factoryType: "middleware" | "controller" | "job";
  scope: string;
};

type Result = Promise<
  { type: "info" | "error" | "success"; message: string }[]
>;
