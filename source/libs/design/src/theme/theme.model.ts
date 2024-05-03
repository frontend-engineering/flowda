import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class ThemeModel {
  @observable colorMode: 'light' | 'dark' = 'light'

  constructor() {
    makeObservable(this)
  }

  setColorMode(colorMode: 'light' | 'dark') {
    this.colorMode = colorMode
  }
}

export const EUI_DARK_COLORS = {
  'ghost': '#FFF',
  'ink': '#000',
  'primary': '#36A2EF',
  'accent': '#F68FBE',
  'success': '#7DDED8',
  'warning': '#F3D371',
  'danger': '#F86B63',
  'emptyShade': '#1D1E24',
  'lightestShade': '#25262E',
  'lightShade': '#343741',
  'mediumShade': '#535966',
  'darkShade': '#98A2B3',
  'darkestShade': '#D4DAE5',
  'fullShade': '#FFF',
  'body': '#141519',
  'highlight': '#2E2D25',
  'disabled': '#515761',
  'disabledText': '#515761',
  'shadow': '#000',
  'primaryText': '#36a2ef',
  'accentText': '#f68fbe',
  'successText': '#7dded8',
  'warningText': '#f3d371',
  'dangerText': '#f86b63',
  'text': '#DFE5EF',
  'title': '#DFE5EF',
  'subduedText': '#81858f',
  'link': '#36a2ef',
}
export const EUI_LIGHT_COLORS = {
  'ghost': '#FFF',
  'ink': '#000',
  'primary': '#07C',
  'accent': '#F04E98',
  'success': '#00BFB3',
  'warning': '#FEC514',
  'danger': '#BD271E',
  'emptyShade': '#FFF',
  'lightestShade': '#F1F4FA',
  'lightShade': '#D3DAE6',
  'mediumShade': '#98A2B3',
  'darkShade': '#69707D',
  'darkestShade': '#343741',
  'fullShade': '#000',
  'body': '#f7f8fc',
  'highlight': '#fff9e8',
  'disabled': '#ABB4C4',
  'disabledText': '#a2abba',
  'shadow': '#000',
  'primaryText': '#006bb8',
  'accentText': '#ba3d76',
  'successText': '#007871',
  'warningText': '#83650a',
  'dangerText': '#bd271e',
  'text': '#343741',
  'title': '#1a1c21',
  'subduedText': '#646a77',
  'link': '#006bb8',
}
