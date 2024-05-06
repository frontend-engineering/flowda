import { Box, Flex } from '@rebass/grid/emotion'
import { observer } from 'mobx-react'
import * as React from 'react'
import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from '../theme/theme.model'
import { FEuiButtonEmpty } from '../eui'
import { NewFormProps } from './new-form'

@observer
export class NewFormToolbar extends React.Component<NewFormProps> {
  override render() {
    return (
      <Flex px={1} py={2} mx={-1} style={{ height: 40 }}>
        <Box mx={1}>
          <FEuiButtonEmpty
            x-color={this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text}
            onClick={() => {}}
            iconType="save"
            size="xs"
            color="text"
          >
            Save
          </FEuiButtonEmpty>
        </Box>
      </Flex>
    )
  }
}
