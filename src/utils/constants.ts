export const TEST_TEMPLATE_DEFAULT_PATH = "test/integration/temp/src";

export const generateFactoryPath = (type: string): string => {
  return process.env.NODE_ENV === "test"
    ? `${TEST_TEMPLATE_DEFAULT_PATH}/main/factories/${type}`
    : `src/main/factories/${type}s`;
};
