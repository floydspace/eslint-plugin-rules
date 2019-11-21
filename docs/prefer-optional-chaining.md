# Enforce to use `optional chaining` operator (prefer-optional-chaining)

[optional chaining](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) is the new `?.` operator for _optional property accesses_.

## Rule Details

This rule is aimed at enforcing to use `optional chaining` the more clean syntax for object null-checks.

Examples of **incorrect** code for this rule:

```ts
foo && foo.bar
foo && foo[bar]
foo && foo["bar"]
foo[bar] && foo[bar].test
foo[bar[0]] && foo[bar[0]].test
foo["bar"] && foo["bar"].test
foo[0] && foo[0].bar
foo[0][1] && foo[0][1].bar
foo && foo.bar()
foo[0] && foo[0].bar()
foo?.bar && foo.bar.test
foo?.bar && foo?.bar.test
foo && foo()
foo && foo?.()
```

Examples of **correct** code for this rule:

```ts
foo?.bar
foo?.[bar]
foo?.["bar"]
foo?.bar()
foo?.()
```

## Options

There are no options.

```json
{
  "@floydspace/prefer-optional-chaining": "error"
}
```

## When Not To Use It

If you do NOT use `TypeScript 3.7` and prefer to use standard JavaScript null-check approach.
