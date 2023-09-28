// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
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
