/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    './node_modules/jest-enzyme/lib/index.js',
    './src/setupTests.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
