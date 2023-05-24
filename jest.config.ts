import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css)$": "<rootDir>/src/config/CssConfigJest.js",
  },
  modulePaths: ["<rootDir>/src"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
