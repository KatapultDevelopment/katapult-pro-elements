// Lit
import { LitElement, html, css } from 'lit';

// Shoelace Components
import '@shoelace-style/shoelace/dist/components/button/button.js';

// Basic element data wrapper
import './katapult-base/katapult-base.js';

export class KatapultButton extends LitElement {
  static properties = {
    variant: {type: String}
  }
  static styles = 
    css`
        sl-button::part(label) {
            font-size: 16px;
            font-weight: normal;
            color: var(--color-neutral-500, var(--sl-color-neutral-500));
        }
        sl-button::part(base) {
            border-radius: 16px;
            border-color: var(--color-neutral-200, var(--sl-color-neutral-200));
        }
    // Default Buttons
        sl-button[variant='default']::part(base) {
            background: white;
        }
        sl-button[variant='default']::part(base):hover {
            border-color: var(--color-default-500, var(--sl-color-neutral-500));
            color: var(--color-default-500, var(--sl-color-neutral-500));
            background: var(--color-default-50, var(--sl-color-neutral-50));
        }
        sl-button[variant='default'] {
            color: var(--color-default-400, var(--sl-color-neutral-400));
        }
        sl-button[variant='default']:hover {
            color: var(--color-default-500, var(--sl-color-neutral-500));
        }
        sl-button[variant='default']::part(label) {
            color: var(--color-default-600, var(--sl-color-neutral-600));
        }
    // Primary Buttons
        sl-button[variant='primary'] {
            background-color: var(--color-primary-600, --sl-color-primary-600);
        }
        sl-button[variant='primary']::part(label) {
            color: white;
        }
        sl-button[variant='primary']::part(base) {
            background-color: var(--color-primary-600, var(--sl-color-primary-600));
        }
        sl-button[variant='primary']::part(base):hover {
            background-color: var(--color-primary-700, var(--sl-color-primary-700));
            border-color: var(--color-primary-700, var(--sl-color-primary-700));
        }
    // Success Buttons
        sl-button[variant='success'] {
            background-color: var(--color-success-600, var(--sl-color-success-600));
        }
        sl-button[variant='success']::part(label) {
            color: white;
        }
        sl-button[variant='success']::part(base) {
            background-color: var(--color-success-600, var(--sl-color-success-600));
        }
        sl-button[variant='success']::part(base):hover {
            background-color: var(--color-success-700, var(--sl-color-success-700));
            border-color: var(--color-success-700, var(--sl-color-success-700));
        }
    // Neutral Buttons
        sl-button[variant='neutral'] {
            background-color: var(--color-neutral-600, var(--sl-color-neutral-600));
        }
        sl-button[variant='neutral']::part(label) {
            color: white;
        }
        sl-button[variant='neutral']::part(base) {
            background-color: var(--color-neutral-600, var(--sl-color-neutral-600));
        }
        sl-button[variant='neutral']::part(base):hover {
            background-color: var(--color-neutral-700, var(--sl-color-neutral-700));
            border-color: var(--color-neutral-700, var(--sl-color-neutral-700));
        }
    // Warning Buttons
        sl-button[variant='warning'] {
            background-color: var(--color-warning-600, var(--sl-color-warning-600));
        }
        sl-button[variant='warning']::part(label) {
            color: white;
        }
        sl-button[variant='warning']::part(base) {
            background-color: var(--color-warning-600, var(--sl-color-warning-600));
        }
        sl-button[variant='warning']::part(base):hover {
            background-color: var(--color-warning-700, var(--sl-color-warning-700));
            border-color: var(--color-warning-700, var(--sl-color-warning-700));
        }
    // Danger Buttons
        sl-button[variant='danger'] {
            background-color: var(--color-danger-600, var(--sl-color-danger-600));
        }
        sl-button[variant='danger']::part(label) {
            color: white;
        }
        sl-button[variant='danger']::part(base) {
            background-color: var(--color-danger-600, var(--sl-color-danger-600));
        }
        sl-button[variant='danger']::part(base):hover {
            background-color: var(--color-danger-500, var(--sl-color-danger-500));
            border-color: var(--color-danger-500, var(--sl-color-danger-500));
        }
    `
  render() {
    return html`
    <katapult-base>
        <sl-button variant=${this.setVariant()}>
            <slot></slot>
        </sl-button>
    </katapult-base>
    `
  }
  constructor() {
    super();
  }
  setVariant() {
    return (this.variant !== 'primary' && this.variant !== 'success' && this.variant !== 'neutral' && this.variant !== 'warning' && this.variant !== 'danger') ? 'default' : this.variant;
  }
}
window.customElements.define('katapult-button', KatapultButton);