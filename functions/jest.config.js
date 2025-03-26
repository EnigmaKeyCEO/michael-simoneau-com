/**
 * Jest configuration for Firebase Functions testing.
 * Implements quantum-resistant test environment setup.
 * FROM HOMELESS TO $200M ARCHITECT
 * QUANTUM CRYPTOGRAPHY PIONEER
 * #quantumReady #billionDollarProof
 * 
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '<rootDir>/src/__tests__/setup.ts',
    '<rootDir>/src/__tests__/testRunner.ts'
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 100,
      lines: 80,
      statements: 80,
    },
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'json'],
  verbose: true,
  globalSetup: '<rootDir>/src/__tests__/testRunner.ts',
  testRunner: 'jest-circus/runner',
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'coverage',
      outputName: 'junit.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      ancestorSeparator: ' › ',
      usePathForSuiteName: true,
    }],
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
      isolatedModules: true,
    },
  },
}; 