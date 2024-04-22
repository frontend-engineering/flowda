import { Component } from 'react'
import { observer } from 'mobx-react'
import { TaskFormModel } from './task-form.model'
import { Formik, FormikProps } from 'formik'
import { EuiFlexGroup, EuiFlexItem, EuiFieldText, EuiForm, EuiFormRow, EuiThemeProvider, EuiButton } from '@elastic/eui'

export class TaskForm extends Component<{
  model: TaskFormModel
}> {
  override render() {
    return (
      <Formik<any>
        onSubmit={(values) => {
          this.props.model.submit(values)
        }}
        initialValues={this.props.model.defaultInitalValues}>
        {(formikProps: FormikProps<any>) => {
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
            <EuiThemeProvider colorMode={this.props.model.theme.colorMode}>
              <EuiForm isInvalid={false} error={[]} component="form">
                <EuiFlexGroup style={{ maxWidth: 600 }}>
                  {
                    this.props.model.columns.map(col => {
                      return (
                        <EuiFlexItem key={col.name}>
                          <EuiFormRow
                            label={col.display_name}
                            isInvalid={!!(touched[col.name] && errors[col.name])}
                            error={errors[col.name] as string}
                          >
                            <EuiFieldText
                              readOnly={col.access_type === 'read_only' ? true : false}
                              name={col.name}
                              isInvalid={!!(touched[col.name] && errors[col.name])}
                              compressed={true}
                              value={values[col.name] == null ? undefined : values[col.name]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </EuiFormRow>
                        </EuiFlexItem>
                      )
                    })
                  }
                </EuiFlexGroup>
                <button type="submit" onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSubmit()
                }}>
                  Save form
                </button>
              </EuiForm>
            </EuiThemeProvider>
          )
        }}
      </Formik>
    )
  }
}
