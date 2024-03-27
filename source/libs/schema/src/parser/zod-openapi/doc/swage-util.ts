import { OpenAPIObject, PathsObject } from "openapi3-ts";

function extractToDef(defs: Record<string, unknown>, body: any) {
    const bodyIn = body.content['application/json']
    const title = bodyIn.schema.title
    defs[title] = bodyIn.schema
    bodyIn.schema = {
        $ref: `#/definitions/${title}`,
    }
}

export function convert(input: OpenAPIObject) {
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
    const output = {
        ...input,
        definitions: defs,
    }
    return output
}