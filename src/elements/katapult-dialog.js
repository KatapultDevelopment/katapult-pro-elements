// Lit
import { LitElement, html, css } from 'lit';

// Shoelace
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

// Color Converter
import convert from 'color-convert';
import rgba from 'color-rgba';

// Basic element data wrapper
import './katapult-base/katapult-base.js';

export class KatapultDialog extends LitElement {
  static properties = {
    open: {type: Boolean},
    noX: {type: Boolean},
    noActions: {type: Boolean},
    noHeader: {type: Boolean},
    noCloseOnEsc: {type: Boolean},
    noCloseOnOutsideClick: {type: Boolean},
    titleAlignment: {type: String},
    titleFill: {type: String}
  }
  static styles = 
    css`
    /* Default styles */
        sl-dialog::part(panel) {
            border-radius: 16px;
        }
        sl-dialog::part(body), sl-dialog::part(footer), sl-dialog::part(title) {
            padding: 16px;
        }
        sl-dialog::part(title) {
            min-height: 50px;
            text-align: left;
        }
        sl-dialog::part(header-actions), sl-dialog::part(close-button) {
            color: var(--katapult-dialog-text);
        }
        sl-dialog::part(header-actions):hover, sl-dialog::part(close-button):hover {
            color: var(--katapult-dialog-text);
        }
    /* Property styles */
        sl-dialog[noCloseOnOutsideClick='true']::part(overlay) {
            display: none;
        }
        sl-dialog[noX='true']::part(close-button) {
            display: none;
        }
        sl-dialog[noActions='true']::part(header-actions) {
            display: none;
        }
        sl-dialog[noHeader='true']::part(header) {
            display: none;
        }
        sl-dialog[filled='true']::part(header) {
            color: var(--katapult-dialog-text);
            border-radius: 16px 16px 0 0;
            background: var(--katapult-dialog-header, var(--primary-color, var(--sl-color-gray-500)));
        }
        sl-dialog[filled='true']::part(title) {
            color: var(--katapult-dialog-text);
            border-radius: 16px 16px 0 0;
            background: var(--katapult-dialog-header, var(--primary-color, var(--sl-color-gray-500)));
        }
        sl-dialog[alignment='center']::part(header) {
            text-align: center;
        }
        sl-dialog[alignment='left']::part(header) {
            text-align: left;
        }
        sl-dialog[alignment='right']::part(header) {
            text-align: right;
        }
    `
  render() {
    return html`
    <katapult-base>
        <sl-dialog noCloseOnOutsideClick=${this.noCloseOnOutsideClick} noHeader=${this.noHeader} filled=${this.titleFill ? true : false} alignment=${this.titleAlignment} noActions=${this.noActions} noX=${this.noX} .open=${this.open}>
            <slot name="label" slot="label">Title</slot>
            <slot name="header-actions" slot="header-actions"></slot>
            <slot></slot>
            <slot name="footer" slot="footer"></slot>
        </sl-dialog>
    </katapult-base>
    `
  }
  constructor() {
    super();

    this.open = false;
    this.noX = false;
    this.noActions = false;
    this.noHeader = false;
    this.titleAlignment = 'center';
    this.titleFill = 'var(--color-primary-600, var(--sl-color-primary-600))';
    this.style.setProperty('--katapult-dialog-header', this.titleFill);
  }
  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
        case 'open':
            if(newVal === '' || newVal === true) this.open = true;
            break;
        case 'titlefill':
            this.style.setProperty('--katapult-dialog-header', newVal);

            // Determine text, x, and icon colors to have good contrast
            if(newVal) {
                const rgbaVal = rgba(newVal).reduce((finalVal, val, index) => index !== 3 ? finalVal + ' ' + val : finalVal + ' / ' + (val * 100) + '%');
                const grayVal = convert.rgb.gray(rgbaVal);
                if(grayVal <= 50) this.style.setProperty('--katapult-dialog-text', 'black');
                else this.style.setProperty('--katapult-dialog-text', 'white');
            }
            break;
    }
  }
}
window.customElements.define('katapult-dialog', KatapultDialog);