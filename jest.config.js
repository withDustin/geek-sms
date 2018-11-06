module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    services: '<rootDir>/src/services',
    constants: '<rootDir>/src/constants',
  },
}
