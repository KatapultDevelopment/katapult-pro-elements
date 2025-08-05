// Lit
import { LitElement, html, css } from 'lit';

// Shoelace Components
import '@shoelace-style/shoelace/dist/components/button/button.js';

// Color Translator
import { ColorTranslator } from 'colortranslator';

// Basic element data wrapper
import '../base-element/katapult-base.js';

// Modules
import { Luma } from '../modules/Luma.js';

export class KatapultButton extends LitElement {
  static properties = {
    // Styling
    variant: {type: String},
    color: { type: String },
    backgroundColor: { type: String },
    borderColor: { type: String },
    textColor: { type: String },
    noBackground: { type: Boolean },
    noBorder: { type: Boolean },
    // Disabled
    disabled: { type: Boolean, reflect: true },
    disabledOnError: { type: Boolean },
    disabledOnSuccess: { type: Boolean },
    loading: { type: Boolean, reflect: true },
    // Errors
    noError: { type: Boolean },
    // Success
    successMessage: { type: String, state: true }
  }

// All custom color properties are in the form R, G, B (i.e. 255, 255, 255) in order to allow rgba to be used on it
// The variable isn't a color unless the var is wrapped in rgb or rgba
  static styles = 
    css`
        /* Set variable defaults */
        :host {
            --katapult-button-background: 255, 255, 255;
            --katapult-button-border: 235, 236, 235;
            --katapult-button-text: 62, 63, 62;
        }
        sl-button::part(label) {
            font-size: 16px;
            font-weight: normal;
        }
        sl-button::part(base) {
            border-radius: 16px;
            color: rgba(var(--katapult-button-text));
        }
    /* Default Buttons */
        sl-button[variant='default']::part(base) {
            background: rgba(var(--katapult-button-background));
            border-color: rgba(var(--katapult-button-border));
        }
        sl-button[variant='default']::part(base):hover {
            border-color: rgba(var(--katapult-button-border), 0.7);
            color: rgba(var(--katapult-button-text));
            background: rgba(var(--katapult-button-background), 0.7);
        }
    `
  render() {
    return html`
    <katapult-base>
        <sl-button variant=${this.variant}>
            <slot></slot>
        </sl-button>
    </katapult-base>
    `
  }
  constructor() {
    super();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // Format the color input if the attribute is a color
    const attributesToFormatColor = ['color', 'backgroundcolor', 'bordercolor', 'textcolor'];
    const [ formattedColor, rgbVals ] = attributesToFormatColor.includes(name) ? this._formatColor(newVal) : [ undefined, undefined ];
    switch(name) {
        // Styles
        case 'variant':
            if(newVal !== 'primary' && newVal !== 'success' && newVal !== 'neutral' && newVal !== 'warning' && newVal !== 'danger') {
                this.variant = 'default';
            } else {
                this.variant = newVal;
                this.style.setProperty('--katapult-button-text', '255, 255, 255');
            }
            break;
        case 'color':
            if(!newVal) break;

            // Set all enabled colors to indicated color, calc text color
            // No nullish check for color - maintains error that the format is incorrect
            if(!this.noBackground) this.style.setProperty('--katapult-button-background', formattedColor);
            if(!this.noBorder) this.style.setProperty('--katapult-button-border', formattedColor);
            // Set text to black if no background, else calc based on background
            if(this.noBackground) this.style.setProperty('--katapult-button-text', '0, 0, 0');
            else this._calcTextColor(rgbVals);
            break;
        case 'backgroundcolor':
            if(!newVal) break;

            if(!this.noBackground) this.style.setProperty('--katapult-button-background', formattedColor);
            break;
        case 'bordercolor':
            if(!newVal) break;

            if(!this.noBorder) this.style.setProperty('--katapult-button-border', formattedColor);
            break;
        case 'textcolor':
            if(!newVal) break;

            this.style.setProperty('--katapult-button-text', formattedColor);
            break;
        case 'nobackground':
            if(newVal || newVal?.length === 0) {
                this.style.setProperty('--katapult-button-background', '255, 255, 255');
                this.style.setProperty('--katapult-button-text', '0, 0, 0');
            }
            break;
        case 'noborder':
            if(newVal || newVal?.length === 0) this.style.setProperty('--katapult-button-border', '255, 255, 255');
            break;
    }
  }

//   STYLE FUNCTIONS  //
  _formatColor(color) {
    const customProperty = this._customProperty(color);
    // GET THIS TO ACTUALLY WORK - NOT ABLE TO ACCESS CUSTOM PROPERTIES AT THIS POINT?
    // WE NEED CODE THAT CONSIDERS ALPHA CHANNELS HERE - MAYBE GRAB THE BACKGROUND COLOR OF THE BOUNDARY ELEMENT TO CONVERT RGBA TO RGB?
    const userColor = customProperty ? this.style.getPropertyValue(customProperty).trim() : color;
    const colorData = new ColorTranslator(userColor).rgb;
    const rgbColor = colorData.R + ', ' + colorData.G + ', ' + colorData.B;
    return [rgbColor, colorData];
  }
  _calcTextColor(color) {
    // WE NEED CODE THAT CONSIDERS ALPHA CHANNELS HERE - MAYBE GRAB THE BACKGROUND COLOR OF THE BOUNDARY ELEMENT TO CONVERT RGBA TO RGB?
    const colorLuma = Luma(color.R, color.G, color.B);
    if(colorLuma < 66.6) this.style.setProperty('--katapult-button-text', '255, 255, 255');
    else this.style.setProperty('--katapult-button-text', '0, 0, 0');
  }
  _customProperty(prop) {
    return prop.match(/^(var\()?(?<prop>--[^\)]*)\)?$/)?.groups.prop;
  }
}
window.customElements.define('katapult-button', KatapultButton);