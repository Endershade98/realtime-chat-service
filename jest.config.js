// jest.config.js
module.exports = {
  testEnvironment: 'node',

  // QUESTO è fondamentale
  setupFiles: ['dotenv/config'],

  globalSetup: './tests/setupTestDB.js',
  globalTeardown: './tests/teardownTestDB.js',
};