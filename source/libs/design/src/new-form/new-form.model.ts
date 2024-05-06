import {
  type ApiService,
  ApiServiceSymbol,
  type ManageableModel,
  newFormUriSchema,
  type ResourceUI,
  ThemeModelSymbol,
  type DefaultFormValueType,
} from '@flowda/types'
import { FormikProps } from 'formik'
import { inject, injectable } from 'inversify'
import { ThemeModel } from '../theme/theme.model'
import * as _ from 'radash'
import { computed, makeObservable, observable, runInAction } from 'mobx'
import { URI } from '@theia/core'
import * as qs from 'qs'

@injectable()
export class NewFormModel implements ManageableModel {
  formikProps: FormikProps<DefaultFormValueType> | undefined

  @observable schema: ResourceUI | undefined

  @computed get formItemColumns() {
    if (this.schema == null) return
    return this.schema.columns.filter(col => {
      if (this.schema?.primary_key === col.name) return false
      if (!col.visible) return false
      return col.access_type !== 'read_only'
    })
  }

  // suppress warning: uncontrolled input to be controlled
  get defaultInitialValues() {
    if (this.schema == null) return {}
    return _.objectify(
      this.schema.columns,
      i => i.name,
      i => '',
    )
  }

  private uri?: string

  constructor(
    @inject(ThemeModelSymbol) public theme: ThemeModel,
    @inject(ApiServiceSymbol) public apiService: ApiService,
  ) {
    makeObservable(this)
  }

  getUri() {
    if (!this.uri) throw new Error('uri is null')
    return this.uri
  }

  setUri(uri: string | URI) {
    if (typeof uri !== 'string') uri = uri.toString(true)
    if (uri != null) {
      if (this.uri == null) {
        this.uri = uri
      } else {
        // double check 下 防止 gridModel grid 未对应
        if (uri !== this.uri) throw new Error(`setRef uri is not matched, current: ${this.uri}, input: ${uri}`)
      }
    }
  }

  async loadSchema(uri: string | URI) {
    this.setUri(uri)

    if (typeof uri === 'string') {
      uri = new URI(uri)
    }
    const query = newFormUriSchema.parse(qs.parse(uri.query))
    const ret = await this.apiService.getResourceSchema({
      schemaName: query.schemaName,
    })
    runInAction(() => {
      this.schema = ret
    })
  }

  async submit(values: DefaultFormValueType) {
    if (!this.formikProps) throw new Error(`formikProps not set`)
    this.formikProps.setSubmitting(true)
    console.log('submit', values)
    this.formikProps.setSubmitting(false)
  }
}
