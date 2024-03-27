import { OpenAPIObject } from 'openapi3-ts'
import { set } from 'lodash'

export function traverse(path: string, tree: any, visit: (k: string, node: any) => void) {
  visit(path, tree)
  if (tree.type === 'object' && tree.properties != null) {
    Object.keys(tree.properties).forEach(k => {
      traverse(`${path}.${k}`, tree.properties[k], visit)
    })
  }
  if (tree.type === 'array' && tree.items) {
    traverse(`${path}[0]`, tree.items, visit)
  }
}

function extractToDef(defs: Record<string, unknown>, body: any) {
  const bodyIn = body.content['application/json']
  const title = bodyIn.schema.title
  let example: any = {}
  traverse('root', bodyIn.schema, (p, node) => {
    if (!!node.description || !!node.example) {
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

export function convertToSwage(input: OpenAPIObject) {
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
