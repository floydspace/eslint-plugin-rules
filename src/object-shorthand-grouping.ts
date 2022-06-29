export default {
  name: 'object-shorthand-grouping',
  meta: {
    docs: {
      description: 'Group your shorthand properties at the beginning of your object declaration',
      category: 'Best Practices',
      recommended: 'error',
      suggestion: true,
      requiresTypeChecking: false,
      url: 'https://github.com/floydspace/eslint-plugin-rules/blob/master/docs/object-shorthand-grouping.md',
    },
    messages: {
      groupProperty: 'Shorthand properties must be grouped at the beginning of the object',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],

  create(context) {
    return {
      ObjectExpression(node) {
        let hasSeenNonShorthand = false;

        for (const property of node.properties) {
          if (property.type === 'Property') {
            if (property.shorthand) {
              if (hasSeenNonShorthand) {
                context.report({
                  node: property,
                  messageId: 'groupProperty',
                });
              }
            } else {
              hasSeenNonShorthand = true;
            }
          }
        }
      },
    };
  },
};
