import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
    coverageProvider: 'v8',
    displayName: 'unit test',
    testEnvironment: 'node',
    testRunner: 'jest-circus/runner',
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    moduleNameMapper: {
        '^#root/(.*)$': '<rootDir>/src/$1',
        '^#source/(.*)$': '<rootDir>/src/source/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coveragePathIgnorePatterns: [],
});
