export const TEST_TEMPLATE_DEFAULT_PATH = "test/integration/temp/src";

export const generateFactoryPath = (type: string): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/main/factories/${type}`
    : `src/main/factories/${type}s`;
};

export const generateMiddlewarePath = (): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/presentation/middlewares`
    : `src/presentation/middlewares`;
};

export const generateUsecasePath = (type: string): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/data/usecases/${type}`
    : `src/data/usecases/${type}`;
};

export const generateRepositoryPath = (type: string): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/infra/db/${type}`
    : `src/infra/db/${type}`;
};
