export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'Add `describe()` at the end',
    },
    fixable: 'code' as const,
    schema: [],
    messages: {
      requires: 'Add `describe()` at the end',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (!isZodType(node)) {
          return
        }
        if (
          node.callee.property.name !== 'array' &&
          node.callee.property.name !== 'object' &&
          (node.parent.type === 'ExpressionStatement' || // z.string()
            node.parent.type === 'VariableDeclarator' || // const a = z.string()
            node.parent?.parent.type === 'ObjectExpression') && // z.object({ hi: z.string() })
          node.callee.property.name !== 'describe'
        ) {
          context.report({
            messageId: 'requires',
            node,
          })
        }
      },
    }
  },
}

function isZodType(node) {
  let o = node.callee.object
  while (o?.type === 'CallExpression') {
    o = o.callee.object
  }
  return o?.name === 'z'
}
