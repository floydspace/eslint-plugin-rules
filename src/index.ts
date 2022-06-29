import objectShorthandGrouping from './object-shorthand-grouping';
import preferOptionalChaining from './prefer-optional-chaining';

export = {
  rules: {
    'prefer-optional-chaining': preferOptionalChaining,
    'object-shorthand-grouping': objectShorthandGrouping,
  },
  configs: {
    all: {
      plugins: ['@floydspace/rules'],
      rules: {
        '@floydspace/rules/object-shorthand-grouping': 'error',
      },
    },
    deprecated: {
      parser: '@typescript-eslint/parser',
      parserOptions: { sourceType: 'module' },
      plugins: ['@floydspace/rules'],
      rules: {
        '@floydspace/rules/prefer-optional-chaining': 'error',
      },
    },
  },
};
