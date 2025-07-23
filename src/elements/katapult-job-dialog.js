// Lit
import { LitElement, html, css, unsafeCSS } from 'lit';

// Shoelace
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

// Elements
import './katapult-job-dropdown.js';

// Styles
import { KatapultShoelace } from '../styles/katapult-shoelace.js';
import { KatapultFlex } from '../styles/katapult-flex.js';

export class KatapultJobDialog extends LitElement {
  static properties = {
    _pickerOpened: {type: Boolean, state: true}
  }
  static styles = [
    unsafeCSS(KatapultShoelace),
    unsafeCSS(KatapultFlex),
    css`
      #job-picker::part(panel) {
        --width: fit-content;
      }
      #job-picker::part(body) {
        width: fit-content;
        padding-bottom: 10px;
        padding-top: 24px;
      }
      #job-picker::part(footer) {
        width: 100%;
      }
      #job-picker::part(overlay),
      #new-job-dialog::part(overlay) {
        display: none;
      }
      #job-picker::part(base),
      #new-job-dialog::part(base) {
        max-height: fit-content;
        margin: auto;
      }
    `
  ]
  render() {
    return html`
      <sl-dialog id="job-picker" filled centered no-actions .open=${this._pickerOpened} label="JOB PICKER">
        <div slot="header-actions"></div>
        <div flex row align-center>
          <katapult-job-dropdown></katapult-job-dropdown>
        </div>
        <div slot="footer">
          <sl-button id="job-picker-close" variant="default" @click=${() => this.close()}>Close</sl-button>
        </div>
      </sl-dialog>
    `
  }
  constructor() {
    super();

    // Variables
    this._pickerOpened = true;
  }
  close() {
    this._pickerOpened = false;
    this.requestUpdate();
  }
}
window.customElements.define('katapult-job-dialog', KatapultJobDialog);