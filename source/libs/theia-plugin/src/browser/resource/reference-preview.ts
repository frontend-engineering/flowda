import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('reference-preview')
export class ReferencePreview extends LitElement {
  @property() values: { label: string; value: string | number }[] = [
    {
      label: 'Id',
      value: 2,
    },
    {
      label: '创建于',
      value: '2024-02-28T08:22:42.201Z',
    },
    {
      label: '类型',
      value: 'AMOUNT',
    },
    {
      label: '次数',
      value: 100,
    },
  ]

  protected override createRenderRoot() {
    return this
  }

  override render() {
    return html`
        <div class="euiFormRow euiFormRow--hasLabel euiFormRow--compressed">
            ${this.values.map(
                    item => html`
                        <div class="euiFormRow__labelWrapper">
                            <label class="euiFormLabel euiFormRow__label">${item.label}</label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                            <div class="euiFormControlLayout euiFormControlLayout--compressed">
                                <div class="euiFormControlLayout__childrenWrapper">
                                    <span class="euiFieldText euiFieldText--compressed euiFieldText--custom">${item.value}</span>
                                </div>
                            </div>
                        </div>`,
            )}
        </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'reference-preview': ReferencePreview
  }
}
