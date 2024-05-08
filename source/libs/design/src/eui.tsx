/// <reference types="@emotion/react" />

import styled from '@emotion/styled'
import { EuiButtonEmpty, EuiHorizontalRule } from '@elastic/eui'

export const FEuiButtonEmpty = styled(EuiButtonEmpty)<{ 'x-color': string }>`
  color: ${props => props['x-color']};
`

export const FEuiHorizontalRule = styled(EuiHorizontalRule)`
  margin-top: 0px;
`
