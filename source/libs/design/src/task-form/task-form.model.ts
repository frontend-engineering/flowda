import { ApiServiceSymbol, ThemeModelSymbol } from '@flowda/types'
import { FormikProps } from 'formik'
import { inject, injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'
import { ThemeModel } from '../theme/theme.model'
import { CustomerOrderResourceSchema, wfCfg } from './__stories__/data'
import axios from 'axios'
import * as _ from 'radash'
import { ApiService } from '../api.service'
import { getChangedValues } from './task-form-utils'

@injectable()
export class TaskFormModel {
  // todo -> mv to plugin
  formikProps: FormikProps<unknown> | undefined
  wfCfg = wfCfg.find(cfg => cfg.taskDefinitionKey === 'Activity_1rzszxz')!

  columns = this.wfCfg.resource.columns.map(c1 => {
    const col = CustomerOrderResourceSchema.columns.find(c2 => c2.name === c1.name)!
    return {
      ...col,
      ...c1,
    }
  })

  // supress warning: uncontrolled input to be controlled
  defaultInitalValues = _.objectify(this.wfCfg.resource.columns,
    i => i.name,
    i => ''
  )

  // save intial backend responsed data, to computed changed value
  initialBackendValues = {}

  constructor(
    @inject(ThemeModelSymbol) public theme: ThemeModel,
    @inject(ApiServiceSymbol) public apiService: ApiService,
  ) {
    makeObservable(this)
  }

  // wfCfg resource input map, map global vars to resource select, then load data
  async loadTask(taskId: string) {
    const res = await axios.request({
      method: 'get',
      url: `http://localhost:3310/flowda-gateway-api/camunda/engine-rest/task/${taskId}/form-variables`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    const vars = res.data
    const input = _.mapValues(this.wfCfg.resource.inputMap, (v, k) => {
      return vars[v].value
    })
    if (typeof this.apiService.apis.getResourceData !== 'function') throw new Error('apis.getResourceData is not implemented')
    const ret: any = await this.apiService.apis.getResourceData({
      schemaName: 'ycdev.CustomerOrderResourceSchema',
      current: 0,
      pageSize: 1,
      sort: [],
      filterModel: {
        number: {
          filterType: 'text',
          type: 'equals',
          filter: input.number
        }
      }
    })
    const values = ret.data[0]
    if (!this.formikProps) throw new Error(`formikProps is null`)
    this.initialBackendValues = values
    this.formikProps.setValues(_.mapValues(values, v => v == null ? '' : v))
  }

  async submit(values: any) {
    const changedValues = getChangedValues(values, this.initialBackendValues)
    if (_.isEmpty(changedValues)) {
      // todo message
      return
    }

    if (!this.formikProps) throw new Error(`formikProps not set`)
    this.formikProps.setSubmitting(true)
    if (typeof this.apiService.apis.putResourceData !== 'function') throw new Error('apis.putResourceData is not implemented')
    await this.apiService.apis.putResourceData({
      schemaName: 'ycdev.CustomerOrderResourceSchema',
      id: values.id,
      updatedValue: changedValues,
    })
    // 2. 调用 workflow rest finish task
    const taskId = 'eaf0dccd-ffae-11ee-907e-26fc8bb373e1'
    const res = await axios.request({
      method: 'post',
      url: `http://localhost:3310/flowda-gateway-api/camunda/engine-rest/task/${taskId}/complete`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })

    // todo: 如果失败手动回滚
    this.formikProps.setSubmitting(false)
  }
}
