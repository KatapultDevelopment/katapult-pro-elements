// Lit
import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';

// Shoelace
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

// Basic element data wrapper
import './katapult-base/katapult-base.js';

/**
 * @property {Array} data
 */

export class KatapultButtonGroup extends LitElement {
  static properties = {
    // Data array includes button labels, actions, and selected status
    data: {type: Array, reflect: true}
  }
  static styles = 
    css`
        sl-button::part(label) {
            font-weight: normal;
            color: var(--color-neutral-700, var(--sl-color-neutral-700));
        }
        sl-button::part(base) {
            border-color: var(--color-neutral-200, var(--sl-color-neutral-200));
        }
        sl-button[selected='true']::part(label),
        sl-button::part(label):hover {
            color: white;
        }
        sl-button[selected='true']::part(base),
        sl-button::part(base):hover {
            background-color: var(--color-primary-600, var(--sl-color-primary-600));
            border-color: var(--color-primary-600, var(--sl-color-primary-600));
        }
    `
  render() {
    return html`
    <katapult-base>
        <sl-button-group>
            ${map(
                this.data,
                (button, index) => html`
                    <sl-button pill selected=${button.selected ? true : false} size="small" @click=${() => this.setSelected(button, index)}>${button.label || ''}</sl-button>
                `
            )}
        </sl-button-group>
    </katapult-base>
    `
  }
  constructor() {
    super();

    this.data = [];
  }
  setSelected(button, index) {
    // Set selected status
    const selectedStatus = this.data[index].selected;
    this.data.forEach(button => button.selected = false);
    this.data[index].selected = selectedStatus ? false : true;
    this.requestUpdate();

    // Call the button's function if it exists
    if(button.action) button.action();
  }
}
window.customElements.define('katapult-button-group', KatapultButtonGroup);