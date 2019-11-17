import preferOptionalChaining from './prefer-optional-chaining';

export = {
  rules: {
    'prefer-optional-chaining': preferOptionalChaining
  },
  configs: {
    all: {
      parser: '@typescript-eslint/parser',
      parserOptions: { 'sourceType': 'module' },
      plugins: ['@floydspace/rules'],
      rules: {
        '@floydspace/rules/prefer-optional-chaining': 'error'
      }
    },
  },
};
