import { colors as fixture_colors } from '../__fixtures__/common'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as _ from 'radash'
import { createTheiaThemeColors } from '../linear-theme-util'
describe('theme', () => {
  it('theia common registered colors', () => {
    const built_in_colors = fixture_colors
      .filter(c => c.defaults?.dark && typeof c.defaults.dark === 'string' && c.defaults.dark.indexOf('#') > -1)
      .map(c => c.id)
    expect(built_in_colors).toMatchInlineSnapshot(`
      [
        "selection.background",
        "icon.foreground",
        "button.background",
        "activityBar.background",
        "activityBarBadge.background",
        "sideBar.background",
        "sideBarSectionHeader.background",
        "list.activeSelectionBackground",
        "list.activeSelectionForeground",
        "list.inactiveSelectionBackground",
        "list.hoverBackground",
        "list.errorForeground",
        "list.warningForeground",
        "list.highlightForeground",
        "editorGroup.border",
        "editorGroupHeader.tabsBackground",
        "tab.inactiveBackground",
        "tab.border",
        "tab.activeModifiedBorder",
        "statusBar.foreground",
        "statusBar.background",
        "statusBar.noFolderBackground",
        "panelTitle.activeForeground",
        "titleBar.activeForeground",
        "titleBar.activeBackground",
        "menu.separatorBackground",
        "dropdown.background",
        "dropdown.foreground",
        "settings.headerForeground",
        "toolbar.hoverBackground",
        "variable.name.color",
        "variable.number.variable.color",
        "variable.boolean.variable.color",
        "variable.string.variable.color",
        "ansi.black.color",
        "ansi.red.color",
        "ansi.green.color",
        "ansi.yellow.color",
        "ansi.blue.color",
        "ansi.magenta.color",
        "ansi.cyan.color",
        "ansi.white.color",
        "editorGutter.commentRangeForeground",
      ]
    `)
  })

  it('linear magic blue', () => {
    const base = fs.readJSONSync(path.join(__dirname, '../__fixtures__/linear-themes/magic-blue/base.json'))
    const darkVs = fs.readJSONSync(path.join(__dirname, '../__fixtures__/dark_vs.json'))
    const baseColor = {
      ...base.color,
      focusColor: base.focusColor,
      shadowColor: base.shadowColor,
      inputBackground: base.inputBackground,
    }
    const ret = createTheiaThemeColors(darkVs, baseColor)
    expect(ret).toMatchInlineSnapshot(`
      {
        "activityBar.background": "#15161c",
        "activityBar.broder": "#292b38",
        "activityBar.foreground": "#e4e4ed",
        "activityBarBadge.background": "#575ac6",
        "button.background": "#6466d8",
        "dropdown.background": "#191a22",
        "editor.background": "#191a22",
        "editor.foreground": "#e4e4ed",
        "editor.inactiveSelectionBackground": "#15161c",
        "editor.selectionHighlightBackground": "#e4e4ed",
        "editorGroupHeader.tabsBackground": "#222430",
        "editorIndentGuide.background": "#222430",
        "focusBorder": "#2e303d",
        "icon.foreground": "#5d5e65",
        "input.background": "#191a22",
        "list.activeSelectionBackground": "#20223f",
        "list.activeSelectionForeground": "#e4e4ed",
        "list.dropBackground": "#191a22",
        "list.focusHighlightForeground": "#6466d8",
        "list.highlightForeground": "#575ac6",
        "list.hoverBackground": "#252748",
        "list.inactiveSelectionBackground": "#20223f",
        "menu.background": "#191a22",
        "menu.border": "#292b38",
        "menu.foreground": "#e4e4ed",
        "pickerGroup.foreground": "#575ac6",
        "quickInput.background": "#191a22",
        "scrollbarSlider.activeBackground": "#5d5e65",
        "scrollbarSlider.background": "#5e5f66",
        "scrollbarSlider.hoverBackground": "#5f6067",
        "selection.background": "#20223f",
        "sideBar.background": "#15161c",
        "statusBar.background": "#15161c",
        "statusBar.foreground": "#999aa1",
        "statusBar.noFolderBackground": "#15161c",
        "tab.activeModifiedBorder": "#2e303d",
        "tab.border": "#2c2d3a",
        "tab.inactiveBackground": "#252634",
        "textLink.foreground": "#8182ff",
        "titleBar.activeBackground": "#15161c",
        "titleBar.activeForeground": "#999aa1",
      }
    `)
  })

  it('linear light', () => {
    const base = fs.readJSONSync(path.join(__dirname, '../__fixtures__/linear-themes/light/base.json'))
    const lightVs = fs.readJSONSync(path.join(__dirname, '../__fixtures__/light_vs.json'))
    const baseColor = {
      ...base.color,
      focusColor: base.focusColor,
      shadowColor: base.shadowColor,
      inputBackground: base.inputBackground,
    }
    const ret = createTheiaThemeColors(lightVs, baseColor)
    expect(ret).toMatchInlineSnapshot(`
      {
        "activityBar.background": "#ececec",
        "activityBar.broder": "#e0e0e0",
        "activityBar.foreground": "#2f2f31",
        "activityBarBadge.background": "#6d78d5",
        "button.background": "#6671c9",
        "dropdown.background": "#fbfbfb",
        "editor.background": "#fbfbfb",
        "editor.foreground": "#2f2f31",
        "editor.inactiveSelectionBackground": "#ececec",
        "editor.selectionHighlightBackground": "#2f2f31",
        "editorGroupHeader.tabsBackground": "#edeef2",
        "editorIndentGuide.background": "#edeef2",
        "focusBorder": "#d8d8d8",
        "icon.foreground": "#9d9d9f",
        "input.background": "#fbfbfb",
        "list.activeSelectionBackground": "#e9eaf4",
        "list.activeSelectionForeground": "#2f2f31",
        "list.dropBackground": "#fbfbfb",
        "list.focusHighlightForeground": "#6671c9",
        "list.highlightForeground": "#6d78d5",
        "list.hoverBackground": "#e4e4ef",
        "list.inactiveSelectionBackground": "#e9eaf4",
        "menu.background": "#fbfbfb",
        "menu.border": "#e0e0e0",
        "menu.foreground": "#2f2f31",
        "pickerGroup.foreground": "#6d78d5",
        "quickInput.background": "#fbfbfb",
        "scrollbarSlider.activeBackground": "#9d9d9f",
        "scrollbarSlider.background": "#9e9ea0",
        "scrollbarSlider.hoverBackground": "#9fa0a1",
        "selection.background": "#e9eaf4",
        "sideBar.background": "#ececec",
        "statusBar.background": "#ececec",
        "statusBar.foreground": "#5c5c5e",
        "statusBar.noFolderBackground": "#ececec",
        "tab.activeModifiedBorder": "#d8d8d8",
        "tab.border": "#dcdcdc",
        "tab.inactiveBackground": "#ffffff",
        "textLink.foreground": "#4161da",
        "titleBar.activeBackground": "#ececec",
        "titleBar.activeForeground": "#5c5c5e",
      }
    `)
  })
})
