import { ESLintUtils, TSESLint, TSESTree, AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';

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
    return {
      'LogicalExpression[operator=&&]'(node: TSESTree.LogicalExpression): void {
        if (node.left.type === AST_NODE_TYPES.MemberExpression) {
          const left = node.left as TSESTree.MemberExpression;
          if (left.object.type === AST_NODE_TYPES.Identifier && left.property.type === AST_NODE_TYPES.Identifier) {
            const leftObject = left.object as TSESTree.Identifier;
            const leftProperty = left.property as TSESTree.Identifier;
            if (node.right.type === AST_NODE_TYPES.MemberExpression) {
              const right = node.right as TSESTree.MemberExpression;
              if (right.object.type === AST_NODE_TYPES.MemberExpression) {
                const rightObject = right.object as TSESTree.MemberExpression;
                if (rightObject.object.type === AST_NODE_TYPES.Identifier && rightObject.property.type === AST_NODE_TYPES.Identifier) {
                  const rightObjectObject = rightObject.object as TSESTree.Identifier;
                  const rightObjectProperty = rightObject.property as TSESTree.Identifier;
                  if (leftObject.name === rightObjectObject.name && leftProperty.name === rightObjectProperty.name) {
                    context.report({ messageId: 'preferOptionalChaining', node });
                  }
                }
              }
            }
          }
        }
        if (node.left.type === AST_NODE_TYPES.Identifier) {
          const left = node.left as TSESTree.Identifier;
          if (node.right.type === AST_NODE_TYPES.MemberExpression) {
            const right = node.right as TSESTree.MemberExpression;
            if (right.object.type === AST_NODE_TYPES.Identifier) {
              const rightObject = right.object as TSESTree.Identifier;
              if (left.name === rightObject.name) {
                context.report({ messageId: 'preferOptionalChaining', node });
              }
            }
          }
        }
      }
    };
  },
});
