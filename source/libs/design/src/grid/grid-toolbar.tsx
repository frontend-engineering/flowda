import { Box, Flex } from '@rebass/grid/emotion'
import { observer } from 'mobx-react'
import * as React from 'react'
import { GridProps } from './grid'
import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from '../theme/theme.model'
import { FEuiButtonEmpty } from '../eui'
import { getBtnTextColor } from '../theme/theme-utils'

@observer
export class GridToolbar extends React.Component<GridProps> {
  override render() {
    return (
      <Flex px={1} py={2} mx={-1} style={{ height: 40 }}>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {
              void this.props.model.refresh(true)
            }}
            iconType="refresh"
            size="xs"
            color="text"
          >
            Refresh
          </FEuiButtonEmpty>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => this.props.model.onNewForm()}
            iconType="plus"
            size="xs"
            color="text"
          >
            New
          </FEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}}
            iconType="filter"
            size="xs"
            color="text"
          >
            Filter
          </FEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}}
            iconType="sortable"
            size="xs"
            color="text"
          >
            Sort
          </FEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={getBtnTextColor(this.props.model.theme.colorMode, this.props.model.selectedRowPk == null)}
            onClick={() => this.props.model.remove()}
            iconType="trash"
            size="xs"
            color="text"
            isDisabled={this.props.model.selectedRowPk == null}
          >
            Delete
          </FEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}}
            iconType="gradient"
            size="xs"
            color="text"
          >
            Column
          </FEuiButtonEmpty>
        </Box>
      </Flex>
    )
  }
}
