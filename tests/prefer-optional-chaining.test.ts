import { TSESLint } from '@typescript-eslint/experimental-utils';

import rule from '../src/prefer-optional-chaining';

const ruleTester = new TSESLint.RuleTester({
  parserOptions: { sourceType: 'module' },
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('prefer-optional-chaining', rule, {
  valid: [
    'foo?.bar',
    'foo && bar',
    'foo && bar.test',
    'foo.bar1 && foo.bar2.test',
    'foo[bar1] && foo[bar2].test',
    'foo[bar[0]] && foo[bar[1]].test',
    'foo["bar1"] && foo["bar2"].test',
    'foo[0] && foo[1].test',
    'foo && bar.test()',
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
      code: 'foo && foo["bar"]',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo[bar] && foo[bar].test',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo[bar[0]] && foo[bar[0]].test',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo["bar"] && foo["bar"].test',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo[0] && foo[0].bar',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo[0][1] && foo[0][1].bar',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo && foo.bar()',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo[0] && foo[0].bar()',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo?.bar && foo.bar.test',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo?.bar && foo?.bar.test',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo && foo()',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
    {
      code: 'foo && foo?.()',
      errors: [{messageId: 'preferOptionalChaining'}],
    },
  ],
});
