import { AST_NODE_TYPES, ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';

const createRule = ESLintUtils.RuleCreator(name => 'https://github.com/floydspace/eslint-plugin-rules/blob/master/README.md');

export default createRule({
  name: 'prefer-optional-chaining',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Force use optional chaining operator.',
      category: 'Stylistic Issues',
      recommended: false,
    },
    messages: {
      preferOptionalChaining: 'Prefer optional chaining operator.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context): TSESLint.RuleListener {
    function expressionsEqual(left: TSESTree.Expression, right: TSESTree.Expression): boolean {
      if (left.type === AST_NODE_TYPES.Literal && right.type === AST_NODE_TYPES.Literal) {
        return left.value === right.value;
      }
      if (left.type === AST_NODE_TYPES.Identifier && right.type === AST_NODE_TYPES.Identifier) {
        return left.name === right.name;
      }
      if (left.type === AST_NODE_TYPES.MemberExpression && right.type === AST_NODE_TYPES.MemberExpression) {
        return expressionsEqual(left.object, right.object) && expressionsEqual(left.property, right.property);
      }
    }

    return {
      'LogicalExpression[operator=&&] > MemberExpression'(node: TSESTree.MemberExpression): void {
        const parent = node.parent as TSESTree.LogicalExpression;
        if (expressionsEqual(parent.left, node.object)) {
          context.report({ messageId: 'preferOptionalChaining', node });
        }
      },
      'LogicalExpression[operator=&&] > CallExpression'(node: TSESTree.CallExpression): void {
        const parent = node.parent as TSESTree.LogicalExpression;
        if (node.callee.type === AST_NODE_TYPES.MemberExpression && expressionsEqual(parent.left, node.callee.object)) {
          context.report({ messageId: 'preferOptionalChaining', node });
        }
      }
    };
  },
});
