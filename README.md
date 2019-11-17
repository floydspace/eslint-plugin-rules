[![Build Status](https://travis-ci.org/floydspace/eslint-plugin-rules.svg?branch=master)](https://travis-ci.org/floydspace/eslint-plugin-rules)
[![npm version](https://badge.fury.io/js/%40floydspace%2Feslint-plugin-rules.svg)](https://badge.fury.io/js/%40floydspace%2Feslint-plugin-rules)

## Installation

Make sure you have TypeScript and `@typescript-eslint/parser` installed, then install the plugin:

```sh
npm i @floydspace/eslint-plugin-rules --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@floydspace/eslint-plugin-rules` globally.

## Usage

Add `@typescript-eslint/parser` to the `parser` field and `@floydspace/rules` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@floydspace/rules"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@floydspace/rules"],
  "rules": {
    "@floydspace/rules/prefer-optional-chaining": "error"
  }
}
```

You can also enable all the rules for our plugin. Add `plugin:@floydspace/rules/all` in extends:

```json
{
  "extends": ["plugin:@floydspace/rules/all"]
}
```

**Note: Make sure to use `eslint --ext .js,.ts` since by [default](https://eslint.org/docs/user-guide/command-line-interface#--ext) `eslint` will only search for .js files.**

## Rules

| Name                                         | Description                                                       |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `@floydspace/rules/prefer-optional-chaining` | Prefer use [optional chaining](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) operator
