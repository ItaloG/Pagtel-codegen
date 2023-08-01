import { generateDomainUsecaseFacade, generateJobFacade } from "@/facades";

export async function jobHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateJobFacade({ name, scope }));
  promises.push(generateDomainUsecaseFacade({ name, scope }));

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  scope: string;
};

type Result = Promise<{ type: string; message: string }[]>;
