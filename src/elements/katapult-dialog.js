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
    noTitleFill: {type: Boolean},
    titleAlignment: {type: String},
    titleFillColor: {type: String},
    textColor: {type: String}
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
            color: var(--katapult-dialog-text, var(--color-text-600));
        }
        sl-dialog::part(header-actions):hover, sl-dialog::part(close-button):hover {
            color: var(--katapult-dialog-text, var(--color-text-600));
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
            color: var(--katapult-dialog-text, var(--color-text-600));
            border-radius: 16px 16px 0 0;
            background: var(--katapult-dialog-header, var(--color-primary-600, var(--sl-color-gray-600)));
        }
        sl-dialog[filled='true']::part(title) {
            color: var(--katapult-dialog-text, var(--color-text-600));
            border-radius: 16px 16px 0 0;
            background: var(--katapult-dialog-header, var(--color-primary-600, var(--sl-color-gray-600)));
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
        <sl-dialog noCloseOnOutsideClick=${this.noCloseOnOutsideClick} noHeader=${this.noHeader} filled=${this.noTitleFill ? false : true} alignment=${this.titleAlignment} noActions=${this.noActions} noX=${this.noX} .open=${this.open}>
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

    // Set variables
    this.open = false;
    this.noX = false;
    this.noActions = false;
    this.noHeader = false;
    this.noTitleFill = false;
    this.titleAlignment = 'center';
    this.titleFillColor = '';
    this.textColor = this.noTitleFill ? 'black' : 'white';

    // Set styles
    this.style.setProperty('--katapult-dialog-text', this.textColor);
  }
  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
        case 'open':
            if(newVal === '' || newVal === true) this.open = true;
            break;
        case 'titlefillcolor':
            this._determineTextColor(newVal);
            break;
        case 'textcolor':
            if(newVal) this.style.setProperty('--katapult-dialog-text', newVal);
            else if(this.noTitleFill) this.style.setProperty('--katapult-dialog-text', 'black');
            else this.style.setProperty('--katapult-dialog-text', 'white');
            break;
    }
  }
  _determineTextColor(newVal) {
    if(newVal) {
        // Determine text, x, and icon colors to have good contrast
        const rgbaVal = rgba(newVal).reduce((finalVal, val, index) => index !== 3 ? finalVal + ' ' + val : finalVal + ' / ' + (val * 100) + '%');
        const grayVal = convert.rgb.gray(rgbaVal);

        if(grayVal <= 50) this.style.setProperty('--katapult-dialog-text', 'black');
        else this.style.setProperty('--katapult-dialog-text', 'white');
        this.style.setProperty('--katapult-dialog-header', newVal);
    } else {
        // Wipe property values if empty
        this.style.removeProperty('--katapult-dialog-text');
        this.style.removeProperty('--katapult-dialog-header');
    }
  }
}
window.customElements.define('katapult-dialog', KatapultDialog);