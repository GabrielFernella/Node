module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverage: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   verbose: true,
//   roots: ['<rootDir>/src'],
//   collectCoverage: true,
//   coverageDirectory: 'coverage',
//   testEnvironment: 'node',
//   transform: {
//     '.+\\.ts$': 'ts-jest',
//   },
// };

// export default config;
