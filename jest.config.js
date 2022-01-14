/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './node_modules/jest-enzyme/lib/index.js',
    './src/setupTests.ts',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  extensionsToTreatAsEsm: ['.ts'],
};
