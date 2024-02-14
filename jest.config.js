const { createConfig } = require('@edx/frontend-build');

const config = createConfig('jest', {
  // setupFilesAfterEnv is used after the jest environment has been loaded.  In general this is what you want.  
  // If you want to add config BEFORE jest loads, use setupFiles instead.  
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.js',
  ],
  coveragePathIgnorePatterns: [
    'src/setupTest.js',
    'src/i18n',
    'src/hooks/testHooks', // don't check coverage for jest mocking tools
    // 'src/data/services/lms/fakeData', // don't check coverage for mock data
    'src/test', // don't check coverage for test integration test utils
    'messages.js', // don't check coverage for i18n messages
    'src/data/services/lms/fakeData', // don't check coverage for fake data
  ],
  testTimeout: 120000,
});

config.moduleDirectories = ['node_modules', 'src'];

// add axios to the list of modules to not transform
config.transformIgnorePatterns = ['/node_modules/(?!@edx|axios)'];
config.testPathIgnorePatterns = ['/dist'];
console.log({ jestTestConfig: config });

module.exports = config;
