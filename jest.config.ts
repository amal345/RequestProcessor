
// const { pathsToModuleNameMapper } = require('ts-jest/utils')
module.exports = {

  preset: 'ts-jest',

  testEnvironment: 'node',

  "verbose": true,

  // setupFilesAfterEnv: ['<rootDir>/tests/helpers/testSetup.ts'],

  roots: ['<rootDir>'],

  modulePaths: ['<rootDir>'],

  // moduleNameMapper: pathsToModuleNameMapper(),

}