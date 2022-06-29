# Enforce shorthand properties grouping (object-shorthand-grouping)

## Rule Details

This rule is aimed at enforcing grouping shorthand properties at the beginning of object declaration.

Examples of **incorrect** code for this rule:

```js
var b = 2;
var obj = {
  a: 1,
  b,
  c: 3,
};
```

Examples of **correct** code for this rule:

```js
var b = 2;
var obj = {
  b,
  a: 1,
  c: 3,
};
```

## Options

There are no options.

```json
{
  "@floydspace/object-shorthand-grouping": "error"
}
```
