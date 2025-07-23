// Lit
import { LitElement, html } from 'lit';

// Shoelace Icons
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

// Styles
import { KatapultShoelaceColors } from '../../styles/katapult-shoelace-colors';

export class KatapultBase extends LitElement {
  static styles = KatapultShoelaceColors
  render() {
    return html`
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes" />
      <!-- Material Icons -->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <!-- Material Symbols -->
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />
      <!-- Shoelace -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/light.css" />
      <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js"></script>
      <slot></slot>
    `
  }
  constructor() {
    super();

    // Shoelace icon support
    registerIconLibrary('material', {
        resolver: (name) => {
        const match = name.match(/^(.*?)(_(round|sharp))?$/);
        return `https://material-icons.github.io/material-icons/svg/${match[1]}/${match[3] || 'outline'}.svg`;
        },
        mutator: (svg) => svg.setAttribute('fill', 'currentColor')
    });
  }
}
window.customElements.define('katapult-base', KatapultBase);