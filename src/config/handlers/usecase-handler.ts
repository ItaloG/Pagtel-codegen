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

  promises.push(generateUsecaseFacade({ name, scope, usecaseType }));
  if (usecaseType !== "mq")
    promises.push(
      generateDataProtocolFacade({
        name,
        scope,
        protocolType: usecaseType,
      })
    );
  promises.push(generateDomainUsecaseFacade({ name, scope }));

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  usecaseType: "db" | "http" | "mq";
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
