/// <reference types="@types/react" />

import { injectable } from 'inversify'
import { CellRendererInput } from '../schemas'

export type CellRenderer = (param: CellRendererInput) => JSX.Element

export interface ICustomResource {
  schemaName: string

  getCellRenderer(colName: string): undefined | CellRenderer
}

export function CustomResource(schemaName: string) {
  const _customRender: Map<string, CellRenderer> = new Map()

  @injectable()
  abstract class AbstractCustomResource implements ICustomResource {
    schemaName = schemaName

    getCellRenderer(colName: string) {
      if (!_customRender.has(colName)) return
      return _customRender.get(colName)
    }

    registerCellRenderer(colName: string, reactNode: CellRenderer) {
      if (_customRender.has(colName)) {
        console.warn(`ignore already registered schema field, schema: ${this.schemaName}, field: ${colName}`)
        return
      }
      _customRender.set(colName, reactNode)
    }
  }

  return AbstractCustomResource
}
