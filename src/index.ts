import preferOptionalChaining from './preferOptionalChainingRule';

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
