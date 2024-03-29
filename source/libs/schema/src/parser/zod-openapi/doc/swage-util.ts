import { set } from 'lodash'
import { SchemaObject } from 'openapi3-ts'

export function traverse(path: string, tree: SchemaObject, visit: (k: string, node: SchemaObject | undefined) => void) {
  visit(path, tree)
  if (tree != null && tree.type === 'object' && tree.properties != null) {
    Object.keys(tree.properties).forEach(k => {
      const prop = tree?.properties?.[k]
      //    ^?
      if (prop == null) return
      if ('$ref' in prop) {
        throw new Error('$ref not support')
      }
      traverse(`${path}.${k}`, prop, visit)
    })
  }
  if (tree.type === 'array' && tree.items) {
    if ('$ref' in tree.items) {
      throw new Error('array $ref not support')
    }
    traverse(`${path}[0]`, tree.items, visit)
  }
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function extractToDef(defs: Record<string, unknown>, body: any) {
  const bodyIn = body.content['application/json']
  const title = bodyIn.schema.title
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const example: any = {}
  traverse('root', bodyIn.schema, (p, node) => {
    if (!!node?.description || !!node?.example) {
      set(example, p, `${node.description}(e.g. ${node.example})`)
    }
  })
  defs[title] = {
    ...bodyIn.schema,
    example: example.root || {},
  }
  bodyIn.schema = {
    $ref: `#/definitions/${title}`,
  }
}

export function convertToSwage(input: {
  paths: Record<string, Record<string, {
    requestBody: unknown,
    responses: Record<string, unknown>
  }>>
}) {
  const defs = {} as Record<string, unknown>
  Object.keys(input.paths).forEach(path => {
    const pathVal = input.paths[path]
    Object.keys(pathVal).forEach(method => {
      const methodVal = pathVal[method]
      const { requestBody, responses } = methodVal
      extractToDef(defs, requestBody)
      Object.keys(responses).forEach(resCode => {
        const resCodeVal = responses[resCode]
        extractToDef(defs, resCodeVal)
      })
    })
  })
  return {
    ...input,
    definitions: defs,
  }
}
