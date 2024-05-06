import { Component } from 'react'
import { type NewFormModel } from './new-form.model'
import { Formik, type FormikProps } from 'formik'
import { EuiFieldText, EuiFlexGrid, EuiFlexItem, EuiForm, EuiFormRow, EuiThemeProvider } from '@elastic/eui'
import { observer } from 'mobx-react'
import { NewFormToolbar } from './new-form-toolbar'
import { Box } from '@rebass/grid/emotion'
import { FEuiHorizontalRule } from '../eui'
import { type DefaultFormValueType } from '@flowda/types'

export type NewFormProps = {
  model: NewFormModel
}

@observer
export class NewForm extends Component<NewFormProps> {
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
          return (
            <EuiThemeProvider colorMode={this.props.model.theme.colorMode}>
              <NewFormToolbar model={this.props.model} />
              <FEuiHorizontalRule />
              <Box mx={3}>
                <EuiForm isInvalid={false} error={[]} component="form">
                  {this.props.model.formItemColumns == null ? null : (
                    <EuiFlexGrid columns={3}>
                      {this.props.model.formItemColumns.map(col => {
                        return (
                          <EuiFlexItem key={col.name}>
                            <EuiFormRow
                              label={col.display_name}
                              isInvalid={!!(touched[col.name] && errors[col.name])}
                              error={errors[col.name] as string}
                            >
                              <EuiFieldText
                                name={col.name}
                                isInvalid={!!(touched[col.name] && errors[col.name])}
                                compressed={true}
                                value={values[col.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </EuiFormRow>
                          </EuiFlexItem>
                        )
                      })}
                    </EuiFlexGrid>
                  )}
                </EuiForm>
              </Box>
            </EuiThemeProvider>
          )
        }}
      </Formik>
    )
  }
}
