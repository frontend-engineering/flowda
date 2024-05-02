import { Component } from 'react'
import { DefaultFormValueType, TaskFormModel } from './task-form.model'
import { Formik, FormikProps } from 'formik'
import { EuiFlexGroup, EuiFlexItem, EuiFieldText, EuiForm, EuiFormRow, EuiThemeProvider, EuiButton } from '@elastic/eui'
import { observer } from 'mobx-react'

@observer
export class TaskForm extends Component<{
  model: TaskFormModel
}> {
  override render() {
    return (
      <Formik<DefaultFormValueType>
        onSubmit={values => {
          this.props.model.submit(values)
        }}
        initialValues={this.props.model.defaultInitialValues}
      >
        {(formikProps: FormikProps<DefaultFormValueType>) => {
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
          const cols = this.props.model.columns
          return (
            <EuiThemeProvider colorMode={this.props.model.theme.colorMode}>
              <EuiForm isInvalid={false} error={[]} component="form">
                <EuiFlexGroup style={{ maxWidth: 600 }}>
                  {cols.map(col => {
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
                  })}
                </EuiFlexGroup>
                <button
                  type="submit"
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSubmit()
                  }}
                >
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
