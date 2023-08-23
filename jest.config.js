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
  ],
});

config.moduleDirectories = ['node_modules', 'src'];
// config.moduleNameMapper['@/(.*)'] = '<rootDir>/src/$1';

module.exports = config;
