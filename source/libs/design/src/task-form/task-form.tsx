import { Component } from 'react'
import { type TaskFormModel } from './task-form.model'
import { Formik, type FormikProps } from 'formik'
import { EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiThemeProvider } from '@elastic/eui'
import { observer } from 'mobx-react'
import { TaskFormToolbar } from './task-form-toolbar'
import { Box } from '@rebass/grid/emotion'
import { FEuiHorizontalRule } from '../eui'
import { type DefaultFormValueType } from '@flowda/types'

export type TaskFormProps = {
  model: TaskFormModel
}

@observer
export class TaskForm extends Component<TaskFormProps> {
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
              <TaskFormToolbar model={this.props.model} />
              <FEuiHorizontalRule />
              <Box mx={3}>
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
                  {/* 迁移到 task-form toolbar */}
                  {/* <EuiButton
                  type="submit"
                  size="s"
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSubmit()
                  }}
                >
                  Save form
                </EuiButton> */}
                </EuiForm>
              </Box>
            </EuiThemeProvider>
          )
        }}
      </Formik>
    )
  }
}
