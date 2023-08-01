/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export default {
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  preset: "ts-jest",
  roots: ["<rootDir>/test"],
  testEnvironment: "node",
};
