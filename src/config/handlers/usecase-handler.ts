import {
  generateDataProtocolFacade,
  generateDomainUsecaseFacade,
  generateUsecaseFacade,
} from "@/facades";

export async function usecaseHandler({
  name,
  scope,
  usecaseType,
}: Params): Result {
  const promises = [];

  switch (usecaseType) {
    case "db":
      promises.push(generateUsecaseFacade({ name, scope, usecaseType }));
      promises.push(
        generateDataProtocolFacade({
          name,
          scope,
          protocolType: usecaseType,
        })
      );
      promises.push(generateDomainUsecaseFacade({ name, scope }));
      break;

    case "http":
      promises.push(generateUsecaseFacade({ name, scope, usecaseType }));
      promises.push(
        generateDataProtocolFacade({
          name,
          scope,
          protocolType: usecaseType,
        })
      );
      promises.push(generateDomainUsecaseFacade({ name, scope }));
      break;

    case "mq":
      promises.push(generateUsecaseFacade({ name, scope, usecaseType }));
      promises.push(generateDomainUsecaseFacade({ name, scope }));
      break;

    case "other":
      promises.push(generateUsecaseFacade({ name, scope, usecaseType }));
      promises.push(generateDomainUsecaseFacade({ name, scope }));
      break;

    default:
      promises.push(Promise.reject(new Error("Usecase Type not allowed")));
      break;
  }

  return Promise.all(promises);
}

type Params = {
  name: string;
  usecaseType: "db" | "http" | "mq" | "other";
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
