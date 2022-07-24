![Maintenance Status](https://img.shields.io/badge/status-deprecated-critical)

:exclamation: Merget to [@floydspace/linters](https://github.com/floydspace/linters) monorepo as `eslint-plugin` package

------

[![Build Status](https://travis-ci.org/floydspace/eslint-plugin-rules.svg?branch=master)](https://travis-ci.org/floydspace/eslint-plugin-rules)
[![Coverage Status](https://coveralls.io/repos/github/floydspace/eslint-plugin-rules/badge.svg?branch=master)](https://coveralls.io/github/floydspace/eslint-plugin-rules?branch=master)
[![npm version](https://badge.fury.io/js/%40floydspace%2Feslint-plugin-rules.svg)](https://badge.fury.io/js/%40floydspace%2Feslint-plugin-rules)
[![npm](https://img.shields.io/npm/dt/@floydspace/eslint-plugin-rules)](https://www.npmjs.com/package/@floydspace/eslint-plugin-rules)

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
    "@floydspace/rules/object-shorthand-grouping": "error"
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

| Name                                                                               | Description                                                                 |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [`@floydspace/rules/object-shorthand-grouping`](docs/object-shorthand-grouping.md) | Group your shorthand properties at the beginning of your object declaration |
