import { generateControllerFacade } from "@/facades";

export async function domainStubHandler({ scope }: Params): Result {
  const promises = [];

  //   promises.push(generateControllerFacade({ name, scope }));

  //   return Promise.all(promises);
}

type Params = {
  scope: string;
};

type Result = Promise<
  { type: "info" | "error" | "success"; message: string }[]
>;
