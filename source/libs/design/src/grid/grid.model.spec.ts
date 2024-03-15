import 'reflect-metadata'
import { getFinalFilterModel, tryExtractFilterModelFromRef } from './grid.model'
import * as _ from 'radash'
import { agFilterSchema } from '@flowda/types'

describe('grid model', () => {
  it('parse _ref', () => {
    const resourceQuery = {
      _ref: '1',
      id: { filterType: 'number', type: 'equals', filter: 1 },
    }
    const parseRet = agFilterSchema.safeParse(resourceQuery)
    expect(parseRet.success).toBe(true)
    if (parseRet.success) {
      expect(parseRet.data).toEqual({ _ref: '1' })
    }
    const resourceQuery2 = _.omit(resourceQuery, ['_ref'])
    const parseRet2 = agFilterSchema.safeParse(resourceQuery2)
    // console.log(parseRet2)
    expect(parseRet2.success).toBe(true)
    if (parseRet2.success) {
      expect(parseRet2.data).toEqual({
        id: { filterType: 'number', type: 'equals', filter: 1 },
      })
    }
  })

  it('test tryExtractFilterModelFromRef', () => {
    const input = {
      _ref: '1',
      id: { filterType: 'number', type: 'equals', filter: 1 },
    }

    const ret = tryExtractFilterModelFromRef(input)
    // console.log(ret)
    expect(ret).toEqual({ id: { filterType: 'number', type: 'equals', filter: 1 } })
  })

  it('test getFinalFilterModel case 1 刷新 尝试从 localStorage 恢复', () => {
    const storage = {
      id: { filterType: 'number', type: 'equals', filter: 1 },
    }
    const ret = getFinalFilterModel({}, null, storage)
    expect(ret).toEqual(storage)
  })

  it('test getFinalFilterModel case 2 非刷新，跳转修改 filter，则覆盖', () => {
    const storage = {
      _ref: '1',
      id: { filterType: 'number', type: 'equals', filter: 1 },
    }
    const ret = getFinalFilterModel({}, null, storage)
    expect(ret).toEqual({ id: { filterType: 'number', type: 'equals', filter: 1 } })
  })

  it('test getFinalFilterModel case 3 非刷新 手动修改 优先级最高', () => {
    const mem = {
      id: { filterType: <const>'number', type: <const>'equals', filter: 1 },
    }
    const storage = {
      id: { filterType: 'number', type: 'equals', filter: 1 },
    }
    const ret = getFinalFilterModel({ id: { filterType: 'number', type: 'equals', filter: 2 } }, mem, storage)
    expect(ret).toEqual({ id: { filterType: 'number', type: 'equals', filter: 2 } })
  })
})
