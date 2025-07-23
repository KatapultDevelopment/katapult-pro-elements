// Lit
import { LitElement, html, unsafeCSS } from 'lit';

// Shoelace
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';

// Styles
import { KatapultShoelace } from '../styles/katapult-shoelace.js';

export class KatapultWarning extends LitElement {
  static properties = {}
  static styles = unsafeCSS(KatapultShoelace)
  render() {
    return html`
      <sl-alert open>
        <sl-icon slot="icon" library="material" name="report_problem_round"></sl-icon>
        <slot></slot>
      </sl-alert>
    `
  }
  constructor() {
    super();
  }
}
window.customElements.define('katapult-warning', KatapultWarning);