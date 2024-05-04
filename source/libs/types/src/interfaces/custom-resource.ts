import { injectable } from 'inversify'
import { type ReactNode } from 'react'

export interface ICustomResource {
  schemaName: string

  getCellRenderer(colName: string): ReactNode
}

export function CustomResource(schemaName: string) {
  const _customRender: Map<string, ReactNode> = new Map()
  @injectable()
  abstract class AbstractCustomResource implements ICustomResource {
    schemaName = schemaName

    getCellRenderer(colName: string) {
      if (!_customRender.has(colName)) return null
      return _customRender.get(colName)
    }

    registerCellRenderer(colName: string, reactNode: ReactNode) {
      if (_customRender.has(colName)) {
        console.warn(`ignore already registered schema field, schema: ${this.schemaName}, field: ${colName}`)
        return
      }
      _customRender.set(colName, reactNode)
    }
  }

  return AbstractCustomResource
}
