import * as React from 'react'
import { css, Global } from '@emotion/react'

export class GridWrapper extends React.Component<React.PropsWithChildren> {
  render() {
    return <>
      <Global styles={css`
          html, body {
              height: 100%;
          }

          #storybook-root {
              height: 100%;
          }
      `} />
      <div className="ag-theme-quartz" style={{ height: '100%' }}>
        {this.props.children}
      </div>
    </>
  }
}
