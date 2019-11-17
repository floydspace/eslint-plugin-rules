import { TSESLint } from '@typescript-eslint/experimental-utils';

import rule from '../src/prefer-optional-chaining';

const ruleTester = new TSESLint.RuleTester({
  parserOptions: { sourceType: 'module' },
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('prefer-optional-chaining', rule, {
  valid: [
    'foo?.bar'
  ],
  invalid: [
    {
      code: 'foo && foo.bar',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo && foo[bar]',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo[bar] && foo[bar].test',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
  ],
});
