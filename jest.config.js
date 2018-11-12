module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', 'config.ts'],
}
