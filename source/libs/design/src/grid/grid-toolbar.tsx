import { EuiButton, EuiButtonEmpty } from '@elastic/eui'
import { Box, Flex } from '@rebass/grid/emotion'
import { observer } from 'mobx-react'
import * as React from 'react'
import { GridProps } from './grid'
import styled from '@emotion/styled'
import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from '../theme/theme.model'

let HiEuiButtonEmpty = styled(EuiButtonEmpty)<{ 'x-color': string }>`
    color: ${props => props['x-color']};
`

@observer
export class GridToolbar extends React.Component<GridProps> {
  override render() {
    return (
      <Flex my={2} mx={-1}>
        <Box mx={1}>
          <HiEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}} iconType="plus" size="xs" color="text">
            New
          </HiEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <HiEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}} iconType="filter" size="xs" color="text">
            Filter
          </HiEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <HiEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}} iconType="sortable" size="xs" color="text">
            Sort
          </HiEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <HiEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}} iconType="trash" size="xs" color="text">
            Delete
          </HiEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <HiEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}} iconType="gradient" size="xs" color="text">
            Column
          </HiEuiButtonEmpty>
        </Box>

      </Flex>
    )
  }
}
