import { injectable } from 'inversify'

export interface ICustomResource {
  schemaName: string
}

export function CustomResource(schemaName: string) {
  @injectable()
  abstract class AbstractCustomResource implements ICustomResource {
    schemaName = schemaName
  }
}
