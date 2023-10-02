// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@edx/frontend-build');

const config =  createConfig('eslint', {
  rules: {
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
  },
  overrides: [
    {
      files: ['*{h,H}ooks.js'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
});

config.rules['react/function-component-definition'][1].unnamedComponents = 'arrow-function';
module.exports = config;
