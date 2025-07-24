// Lit
import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';

// Shoelace
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

// Basic element data wrapper
import './katapult-base/katapult-base.js';

export class KatapultButtonGroup extends LitElement {
  static properties = {
    // Data array includes button labels, actions, and selected status
    data: {type: Array}
  }
  static styles = 
    css`
        sl-button::part(label) {
            font-weight: normal;
            color: var(--color-neutral-700, var(--sl-color-neutral-700));
        }
        sl-button::part(base) {
            border-color: var(--color-neutral-300, var(--sl-color-neutral-300));
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
                (button) => html`
                    <sl-button pill selected=${button.selected ? true : false} size="small" @click=${button.action || this.informNoFunction}>${button.label || ''}</sl-button>
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
  informNoFunction() {
    console.log('No function exists for this button');
  }
}
window.customElements.define('katapult-button-group', KatapultButtonGroup);