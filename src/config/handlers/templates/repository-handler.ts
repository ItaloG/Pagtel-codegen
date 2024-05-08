import {
  generateMongoModelFacade,
  generateRepositoryFacade,
} from "@/facades";

export async function repositoryHandler({
  name,
  database,
  repositoryType,
  schema,
}: Params): Result {
  const promises = [];

  if (repositoryType === "mongodb") {
    promises.push(generateMongoModelFacade({ name, scope: database }));
    promises.push(
      generateRepositoryFacade({ name, database, schema, repositoryType })
    );
  } else
    promises.push(
      generateRepositoryFacade({ name, database, schema, repositoryType })
    );

  return Promise.all(promises);
}

type Params = {
  name: string;
  repositoryType: "mongodb" | "mssql";
  database: string;
  schema: string;
};

type Result = Promise<
  { type: "info" | "error" | "success"; message: string }[]
>;
