// Lit
import { LitElement, html, css } from 'lit';
import { when } from 'lit/directives/when.js';

// Shoelace Components
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';

// Basic element data wrapper
import './katapult-base/katapult-base.js';

export class KatapultAlert extends LitElement {
  static properties = {
    variant: {type: String}
  }
  static styles = 
    css`
      sl-alert[variant='primary']::part(icon) {
        color: var(--color-primary-600, var(--sl-color-primary-600));
      }
      sl-alert[variant='primary']::part(base) {
          border-top-color: var(--color-primary-600, var(--sl-color-primary-600));
      }
      sl-alert[variant='success']::part(icon) {
        color: var(--color-success-600, var(--sl-color-success-600));
      }
      sl-alert[variant='success']::part(base) {
        border-top-color: var(--color-success-600, var(--sl-color-success-600));
      }
      sl-alert[variant='neutral']::part(icon) {
        color: var(--color-neutral-600, var(--sl-color-neutral-600));
      }
      sl-alert[variant='neutral']::part(base) {
        border-top-color: var(--color-neutral-600, var(--sl-color-neutral-600));
      }
      sl-alert[variant='warning']::part(icon) {
        color: var(--color-warning-600, var(--sl-color-warning-600));
      }
      sl-alert[variant='warning']::part(base) {
        border-top-color: var(--color-warning-600, var(--sl-color-warning-600));
      }
      sl-alert[variant='danger']::part(icon) {
        color: var(--color-danger-600, var(--sl-color-danger-600));
      }
      sl-alert[variant='danger']::part(base) {
        border-top-color: var(--color-danger-600, var(--sl-color-danger-600));
      }
    `
  render() {
    return html`
    <katapult-base>
      <sl-alert open variant=${this.setVariant()}>
        ${when(
          this.variant === 'primary',
          () => html`<sl-icon slot="icon" library="material" name="info_round"></sl-icon>`
        )}
        ${when(
          this.variant === 'success',
          () => html`<sl-icon slot="icon" library="material" name="check_circle_round"></sl-icon>`
        )}
        ${when(
          this.variant === 'neutral',
          () => html`<sl-icon slot="icon" library="material" name="settings_round"></sl-icon>`
        )}
        ${when(
          this.variant === 'warning',
          () => html`<sl-icon slot="icon" library="material" name="report_problem_round"></sl-icon>`
        )}
        ${when(
          this.variant === 'danger',
          () => html`<sl-icon slot="icon" library="material" name="notification_important_round"></sl-icon>`
        )}
        <!-- Allow users to slot their own icons if they haven't set a variant (keep variant icons consistent) -->
        ${when(
          this.invalidVariant(),
          () => html`<slot name="icon"></slot>`
        )}
        <slot></slot>
      </sl-alert>
    </katapult-base>
    `
  }
  constructor() {
    super();
  }
  invalidVariant() {
    return this.variant !== 'primary' && this.variant !== 'success' && this.variant !== 'neutral' && this.variant !== 'warning' && this.variant !== 'danger';
  }
  setVariant() {
    return (this.variant !== 'success' && this.variant !== 'neutral' && this.variant !== 'warning' && this.variant !== 'danger') ? 'primary' : this.variant;
  }
}
window.customElements.define('katapult-alert', KatapultAlert);