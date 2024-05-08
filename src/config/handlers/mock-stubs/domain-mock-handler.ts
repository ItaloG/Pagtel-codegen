import { generateMockFacade } from "@/facades";

export async function domainMockHandler({ scope }: Params): Result {
  const promises = [];

  promises.push(generateMockFacade({ scope }));

  return Promise.all(promises);
}

type Params = {
  scope: string;
};

type Result = Promise<
  { type: "info" | "error" | "success"; message: string }[]
>;
