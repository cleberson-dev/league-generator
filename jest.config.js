module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [ "**/?(*.)+(spec|test).ts?(x)" ],
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  }
};