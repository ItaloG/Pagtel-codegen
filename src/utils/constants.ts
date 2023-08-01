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

export const generateJobPath = (): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/job/jobs`
    : `src/job/jobs`;
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

export const generateServicePath = (): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/infra/http/service`
    : `src/infra/http/service`;
};

export const generateControllerPath = (): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/presentation/controllers`
    : `src/presentation/controllers`;
};

export const generateDataProtocolPath = (type: string): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/data/protocols/${type}`
    : `src/data/protocols/${type}`;
};

export const generateDomainUsecasePath = (): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/domain/usecases`
    : `src/domain/usecases`;
};

export const generateMongoModelPath = (): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/infra/db/mongodb`
    : `src/infra/db/mongodb`;
};
