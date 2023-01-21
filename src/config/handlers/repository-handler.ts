import { generateMongoModelFacade, generateRepositoryFacade } from "@/facades";

export async function repositoryHandler({
  name,
  database,
  repositoryType,
  schema,
}: Params): Result {
  const promises = [];

  promises.push(
    generateRepositoryFacade({ name, database, schema, repositoryType })
  );
  if (repositoryType === "mongodb")
    promises.push(generateMongoModelFacade({ name, scope: database }));

  const result = await Promise.all(promises);

  return result;
}

type Params = {
  name: string;
  repositoryType: "mongodb" | "mssql";
  database: string;
  schema: string;
};

type Result = Promise<{ type: string; message: string }[]>;
