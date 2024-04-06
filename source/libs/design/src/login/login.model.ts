import { action, makeObservable, observable, } from 'mobx'
import type { FormikProps } from 'formik'
import { injectable, inject } from 'inversify'
import { ThemeModelSymbol, loginInputSchemaDto, loginOutputSchemaDto } from '@flowda/types'
import { ThemeModel } from '../theme/theme.model'

@injectable()
export class LoginModel {
  public formikProps: FormikProps<loginInputSchemaDto> | undefined

  @observable isLogin = false

  handlers: Partial<{
    info: (message: string, opts: { timeout: number }) => void
    validate: (input: loginInputSchemaDto) => Promise<loginOutputSchemaDto>
  }> = {}

  constructor(
    @inject(ThemeModelSymbol) public theme: ThemeModel,
  ) {
    makeObservable(this)
  }

  @action.bound
  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin
  }

  checkLogin() {
    const access_token = localStorage.getItem('access_token')
    this.setIsLogin(access_token != null)
  }

  async login(accept?: () => Promise<void>) {
    if (!this.formikProps) throw new Error()
    this.formikProps.setSubmitting(true)
    try {
      if (typeof this.handlers.validate !== 'function') {
        throw new Error('handlers.validate is not implemented!')
      }
      const res = await this.handlers.validate(this.formikProps.values)
      localStorage.setItem('access_token', res.at.token)
      this.setIsLogin(true)
      if (typeof accept === 'function') {
        await accept()
      }
      if (typeof this.handlers.info === 'function') {
        this.handlers.info('Login succeed!', {
          timeout: 3000,
        })
      }
    } catch (e) {
      console.error('[LoginDialog accept]', e)
    }
    this.formikProps.setSubmitting(false)
  }

  logout() {
    localStorage.removeItem('access_token')
    this.setIsLogin(false)
  }
}
