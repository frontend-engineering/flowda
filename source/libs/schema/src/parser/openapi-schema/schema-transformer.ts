import { ExtendSchemaObject } from '../zod-openapi/index'

export class SchemaTransformer {
  private jsonSchema?: ExtendSchemaObject

  set(jsonSchema: ExtendSchemaObject) {
    this.jsonSchema = jsonSchema
    return this
  }

  toJSON() {
    return this.jsonSchema
  }
}
