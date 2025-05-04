// jest.config.mjs

export default {
    transform: {
        '^.+\\.js$': 'babel-jest', // Transforma arquivos .js com babel-jest
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'node'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.js'],
    globalSetup: '<rootDir>/jest.global-setup.js',
    setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],
};
