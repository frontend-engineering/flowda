import { Box, Flex } from '@rebass/grid/emotion'
import { observer } from 'mobx-react'
import * as React from 'react'
import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from '../theme/theme.model'
import { TaskFormProps } from './task-form'
import { FEuiButtonEmpty } from '../eui'

@observer
export class TaskFormToolbar extends React.Component<TaskFormProps> {
  override render() {
    return (
      <Flex px={1} py={2} mx={-1} style={{ height: 40 }}>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}}
            iconType="push"
            size="xs"
            color="text"
          >
            Approve
          </FEuiButtonEmpty>
        </Box>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}}
            iconType="returnKey"
            size="xs"
            color="text"
          >
            Reject
          </FEuiButtonEmpty>
        </Box>
      </Flex>
    )
  }
}
