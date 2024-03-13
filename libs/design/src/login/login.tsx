import * as React from 'react'
import { Formik, FormikProps } from 'formik'
import { EuiFieldText, EuiForm, EuiFormRow, EuiThemeProvider } from '@elastic/eui'
import { observer } from 'mobx-react'
import { LoginModel } from './login.model'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { loginInputSchema, loginInputSchemaDto } from '@flowda/types'

@observer
export class Login extends React.Component<{
  model: LoginModel
}> {
  override render() {
    if (this.props.model.isLogin) {
      return (
        <div>
          Already logged in!{' '}
          <a
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              this.props.model.logout()
            }}
          >
            Logout
          </a>
        </div>
      )
    } else {
      return (
        <Formik<loginInputSchemaDto>
          onSubmit={() => {}}
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={toFormikValidationSchema(loginInputSchema)}
        >
          {(formikProps: FormikProps<loginInputSchemaDto>) => {
            this.props.model.formikProps = formikProps
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            } = formikProps
            return (
              <EuiThemeProvider colorMode="dark">
                <EuiForm isInvalid={false} error={[]} component="form">
                  <EuiFormRow
                    label="Username"
                    isInvalid={!!(touched['username'] && errors['username'])}
                    error={errors['username']}
                  >
                    <EuiFieldText
                      name="username"
                      isInvalid={!!(touched['username'] && errors['username'])}
                      compressed={true}
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </EuiFormRow>
                  <EuiFormRow
                    label="Password"
                    isInvalid={!!(touched['password'] && errors['password'])}
                    error={errors['password']}
                  >
                    <EuiFieldText
                      name="password"
                      type="password"
                      isInvalid={!!(touched['password'] && errors['password'])}
                      compressed={true}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </EuiFormRow>
                </EuiForm>
              </EuiThemeProvider>
            )
          }}
        </Formik>
      )
    }
  }
}
