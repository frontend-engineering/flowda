import { injectable } from '@theia/core/shared/inversify'
import * as React from '@theia/core/shared/react'
import { SidebarBottomMenuWidget } from '@theia/core/lib/browser/shell/sidebar-bottom-menu-widget'

@injectable()
export class HelloSidebarBottomMenuWidget extends SidebarBottomMenuWidget {

  override render(): React.ReactNode {
    return <React.Fragment>
      {this.menus.map(menu => {
        if (menu.id === 'settings-menu') {
          return <div className="custom-avatar-wrapper"
                      key={menu.id}
                      onClick={e => this.onClick(e, menu.menuPath)}
                      onMouseDown={this.onMouseDown}
                      onMouseEnter={e => this.onMouseEnter(e, menu.title)}
                      onMouseLeave={this.onMouseOut}>
            <div className="custom-avatar">SH</div>
          </div>
        }
        return <i
          key={menu.id}
          className={menu.iconClass}
          onClick={e => this.onClick(e, menu.menuPath)}
          onMouseDown={this.onMouseDown}
          onMouseEnter={e => this.onMouseEnter(e, menu.title)}
          onMouseLeave={this.onMouseOut}
        />
      })}
    </React.Fragment>
  }
}
