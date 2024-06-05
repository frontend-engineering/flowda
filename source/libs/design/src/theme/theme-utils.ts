import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from './theme.model'

export function getBtnTextColor(colorMode: 'light' | 'dark', disabled: boolean) {
  return colorMode === 'light'
    ? disabled
      ? EUI_LIGHT_COLORS.disabledText
      : EUI_LIGHT_COLORS.text
    : disabled
    ? EUI_DARK_COLORS.disabledText
    : EUI_DARK_COLORS.text
}
