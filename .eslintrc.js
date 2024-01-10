// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@edx/frontend-build');

const config =  createConfig('eslint', {
  rules: {
    'import/no-unresolved': 'off',
  },
  globals: {
    MathJax: true,
  },
});

config.rules['react/function-component-definition'][1].unnamedComponents = 'arrow-function';
module.exports = config;
