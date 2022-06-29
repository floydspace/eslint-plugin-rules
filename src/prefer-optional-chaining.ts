import { AST_NODE_TYPES, ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';

const createRule = ESLintUtils.RuleCreator((name) => `https://github.com/floydspace/eslint-plugin-rules/blob/master/docs/${name}.md`);

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
    fixable: 'code',
    deprecated: true,
  },
  defaultOptions: [],
  create(context): TSESLint.RuleListener {
    function expressionsEqual(left: TSESTree.Expression, right: TSESTree.Expression): boolean {
      if (!left || !right) {
        return false;
      }
      if (left.type === AST_NODE_TYPES.Literal && right.type === AST_NODE_TYPES.Literal) {
        return left.value === right.value;
      }
      if (left.type === AST_NODE_TYPES.Identifier && right.type === AST_NODE_TYPES.Identifier) {
        return left.name === right.name;
      }
      if (
        (left.type === AST_NODE_TYPES.MemberExpression || left.type === AST_NODE_TYPES.OptionalMemberExpression) &&
        (right.type === AST_NODE_TYPES.MemberExpression || right.type === AST_NODE_TYPES.OptionalMemberExpression)
      ) {
        return expressionsEqual(left.object, right.object) && expressionsEqual(left.property, right.property);
      }
    }

    function reportWithFixer(node: TSESTree.LogicalExpression, fixedTextFn: (sourceCode: TSESLint.SourceCode) => string): void {
      context.report({
        node,
        messageId: 'preferOptionalChaining',
        fix: (fixer) => fixer.replaceText(node, fixedTextFn(context.getSourceCode())),
      });
    }

    return {
      'LogicalExpression[operator=&&] > MemberExpression,OptionalMemberExpression'(node: TSESTree.MemberExpression | TSESTree.OptionalMemberExpression): void {
        const parent = node.parent as TSESTree.LogicalExpression;
        if (expressionsEqual(parent.left, node.object)) {
          reportWithFixer(parent, (sourceCode) => {
            let propertyText = sourceCode.getText(node.property);
            if (node.computed) propertyText = `[${propertyText}]`;
            return `${sourceCode.getText(parent.left)}?.${propertyText}`;
          });
        }
      },
      'LogicalExpression[operator=&&] > CallExpression,OptionalCallExpression'(node: TSESTree.CallExpression | TSESTree.OptionalCallExpression): void {
        const parent = node.parent as TSESTree.LogicalExpression;
        if (
          (node.callee.type === AST_NODE_TYPES.MemberExpression || node.callee.type === AST_NODE_TYPES.OptionalMemberExpression) &&
          expressionsEqual(parent.left, node.callee.object)
        ) {
          reportWithFixer(parent, (sourceCode) => {
            const collee = node.callee as TSESTree.MemberExpression | TSESTree.OptionalMemberExpression;
            const args = node.arguments.map((arg) => sourceCode.getText(arg));
            return `${sourceCode.getText(parent.left)}?.${sourceCode.getText(collee.property)}(${args.join(', ')})`;
          });
        }
        if (node.callee.type === AST_NODE_TYPES.Identifier && expressionsEqual(parent.left, node.callee)) {
          reportWithFixer(parent, (sourceCode) => {
            const args = node.arguments.map((arg) => sourceCode.getText(arg));
            return `${sourceCode.getText(parent.left)}?.(${args.join(', ')})`;
          });
        }
      },
    };
  },
});
