import { generateDomainUsecaseFacade, generateJobFacade } from "@/facades";

export async function jobHandler({ name, scope }: Params): Result {
  const promises = [];

  promises.push(generateJobFacade({ name, scope }));
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
