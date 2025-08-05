import { LitElement, html, css, nothing } from 'lit';

import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';

import { ColorTranslator } from 'colortranslator';

import { KatapultIcon } from './katapult-icon.js';
import './katapult-collapse.js';

import '@polymer/iron-collapse/iron-collapse.js';
import { TemplateInstanceBase } from '@polymer/polymer/lib/utils/templatize.js';
import { uuidv4 } from '../../modules/browserUUIDv4.js';
import { Luma } from '../modules/Luma.js';

export class KatapultButton extends LitElement {
  static ParseCssCustomProperty(prop) {
    return prop.match(/^(var\()?(?<prop>--[^\)]*)\)?$/)?.groups.prop;
  }

  static GetCssCustomProperty(prop, elem) {
    if (typeof prop != 'string') return;
    // See if this color is a custom css property.
    const cssCustomProperty = KatapultButton.ParseCssCustomProperty(prop);
    if (cssCustomProperty) {
      let value = null;
      while ((value == null || value == '') && elem != null) {
        value = getComputedStyle(elem).getPropertyValue(cssCustomProperty).trim();
        elem = elem.getRootNode().host;
      }
      if (value == '') return null;
      return value;
    }
    return prop;
  }

  static GetColorTranslator(color, elem) {
    // Handle 'transparent' color string.
    if (color == 'transparent') color = 'rgba(0,0,0,0)';
    // Convert color (potentially a keyword or css variable) and set default if nullish.
    color = KatapultButton.GetCssCustomProperty(color, elem);
    if (color == null || color == '') color = 'white';
    // Return a color translator instance.
    return new ColorTranslator(color);
  }

  static GetTextColor(_color, elem) {
    // Get a color translator.
    const color = KatapultButton.GetColorTranslator(_color, elem);
    // Get initial color luma.
    const colorLuma = Luma(color.R, color.G, color.B);
    // Set lightness to be the opposite of what the _color is.
    color.setL(colorLuma < 66.6 ? 98 : 20);
    // Return the color.
    return color.RGBA;
  }

  static GetBorderColor(_color, elem) {
    // Get a color translator.
    const color = KatapultButton.GetColorTranslator(_color, elem);
    // Get initial color luma.
    const colorLuma = Luma(color.R, color.G, color.B);
    // If color is light, reduce its lightness by 10%.
    if (colorLuma >= 80) color.setL(color.L * 0.9);
    // Return the color.
    return color.RGBA;
  }

  static properties = {
    _animate: { state: true },
    backgroundColor: { type: String },
    borderColor: { type: String },
    busy: { type: Boolean, reflect: true },
    callback: { type: String },
    color: { type: String },
    config: { type: Object },
    disabled: { type: Boolean, reflect: true },
    disabledOnError: { type: Boolean },
    disabledOnSuccess: { type: Boolean },
    error: { type: Boolean, reflect: true, state: true },
    errorMessage: { type: String, state: true },
    icon: { type: String },
    _iconArray: { state: true },
    iconOnly: { type: Boolean, reflect: true },
    iconButton: { type: Boolean },
    iconConfig: { type: Object },
    justify: { type: String, reflect: true },
    label: { type: String },
    _labelWidth: { type: Number, state: true },
    loading: { type: Boolean, reflect: true },
    _message: { type: String, state: true },
    noBackground: { type: Boolean },
    noBorder: { type: Boolean },
    noError: { type: Boolean },
    noOutline: { type: Boolean },
    noRipple: { type: Boolean, state: false },
    outlined: { type: Boolean },
    _palette: { state: true },
    reverse: { type: Boolean, reflect: true }, // reverses the flex direction of the button's children (e.g. used to render the icon to the right of the text)
    _showMessage: { type: Boolean, state: true },
    size: { type: String },
    _size: { state: true },
    success: { type: Boolean, reflect: true, state: true },
    successMessage: { type: String, state: true },
    vertical: { type: Boolean, reflect: true },
    textColor: { type: String },
    _textColor: { state: true }
  };

  static styles = css`
    :host {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: var(--katapult-button-font-size);
      padding: 0.5em;
      border-radius: 16px;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none; /* Safari */
      background: var(--katapult-button-background);
      color: var(--katapult-button-color);
      transition: var(--katapult-button-transition);
      min-height: fit-content;
      overflow: hidden;
      border: 1px solid var(--katapult-button-border-color);
    }

    :host(:active) {
      border-radius: 12px;
    }

    :host([hidden]),
    [hidden] {
      display: none !important;
    }

    :host([reverse]) {
      flex-direction: row-reverse;
    }

    :host([reverse][vertical]) {
      flex-direction: column-reverse;
      text-align: center;
    }

    :host([vertical]) {
      flex-direction: column;
      text-align: center;
    }

    :host([justify='left']),
    :host([justify='right'][reverse]) {
      justify-content: flex-start;
    }

    :host([justify='right']),
    :host([justify='left'][reverse]) {
      justify-content: flex-end;
    }

    :host([justify='left'][vertical]) {
      align-items: flex-start;
    }

    :host([justify='right'][vertical]) {
      align-items: flex-end;
    }

    :host(:not([busy]):hover) {
      cursor: pointer;
    }

    :host([busy]) {
      pointer-events: none;
    }

    #icons {
      position: relative;
      height: var(--katapult-button-size);
      width: var(--katapult-button-size);
      transition:
        height 0.3s,
        width 0.3s;
    }

    #icons > * {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
    }

    #icons [hide] {
      opacity: 0;
      pointer-events: none;
    }

    @keyframes pulse {
      0% {
        transform: scale(0);
      }
      40% {
        transform: scale(1.3);
      }
      100% {
        transform: scale(1);
      }
    }

    #icons [pulse-on-entry][hide] {
      transform: scale(0);
    }

    #icons [pulse-on-entry]:not([hide]) {
      animation: pulse 0.5s ease-out;
    }

    #labelContainer {
      display: flex;
      flex-direction: column;
      transition: margin 0.3s;
    }

    #label {
      display: flex;
      align-items: center;
      width: fit-content;
    }

    paper-spinner-lite {
      --paper-spinner-color: var(--katapult-button-color);
      background: transparent;
      height: 1.5em;
      width: 1.5em;
      padding: 0.1em;
      box-sizing: border-box;
      transition:
        color 0.3s,
        opacity 0.3s;
    }

    #message {
      font-size: 0.666em;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  render() {
    return html`
      ${this._iconTemplate()} ${this._labelTemplate()}
      <paper-ripple ?noink=${this.noRipple}></paper-ripple>
    `;
  }

  _iconTemplate() {
    // Calc hide/show flags for various icons.
    const opened = this.icon || this.iconOnly || this.loading || this.success || this.error;
    const showPrimary = this.icon && !this.loading && !this.success && !this.error;
    const showSuccess = this.success && !this.loading && !this.error;
    const showError = this.error && !this.loading;
    const showLoading = this.loading;
    return html`
      <katapult-collapse .horizontal=${!this.vertical} .opened=${opened}>
        <div id="icons">
          <!-- Primary Icon -->
          ${repeat(
            this._iconArray,
            (x) => x.key,
            (x) =>
              html`<katapult-icon
                .icon=${x.icon}
                .outline=${this.disabled}
                .size=${this._size}
                .color=${this.iconConfig?.color ?? this._textColor}
                .config=${this.iconConfig}
                ?hide=${x.hide || !showPrimary}
              >
              </katapult-icon>`
          )}
          <!-- Success Icon -->
          <katapult-icon icon="check_circle" .size=${this._size} color="var(--paper-green-500)" ?hide=${!showSuccess} pulse-on-entry>
          </katapult-icon>
          <!-- Error Icon -->
          <katapult-icon icon="error" .size=${this._size} color="var(--paper-red-500)" ?hide=${!showError} pulse-on-entry> </katapult-icon>
          <!-- Loading Spinner -->
          <paper-spinner-lite ?hide=${!showLoading} .active=${showLoading}> </paper-spinner-lite>
        </div>
      </katapult-collapse>
      <!-- Icon Spacer -->
      <div style=${styleMap({ width: opened && !this.iconOnly ? '0.5em' : '0', flexShrink: '0' })}></div>
    `;
  }

  _labelTemplate() {
    // To prevent the opening of the message collapse from changing the button's height,we subtract the
    // height of the collapse content from the height of the parent container via the margin property.
    const messageHeight = this._messageCollapseElement?.contentSize.height ?? 0;
    // Return the label  template.
    return !this.iconOnly
      ? html`
          <div
            id="labelContainer"
            style=${styleMap({
              margin: this._showMessage ? `-${messageHeight / 2}px 0px` : '0px'
            })}
          >
            <!-- Main Label -->
            <div id="label">
              <slot>${this.label}</slot>
            </div>
            <!-- Message Collapse -->
            <katapult-collapse id="messageCollapse" .opened=${this._showMessage} @content-size-change=${() => this.requestUpdate()}>
              <div id="message" style=${styleMap({ width: this._labelWidth ? this._labelWidth + 'px' : 'unset' })} title=${this._message}>
                ${this._message}
              </div>
            </katapult-collapse>
          </div>
        `
      : nothing;
  }

  constructor() {
    super();

    // Set property defaults.
    this._iconArray = [];
    this._animate = this.vertical = this.success = this.error = this.loading = false;

    // Setup click event handler.
    this.addEventListener('click', (e) => this._clickHandler(e));

    setTimeout(() => (this._animate = true), 1000);

    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        switch (entry.target) {
          case this._labelElement:
            this._labelWidth = entry.contentRect.width;
            break;
        }
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._paletteAppliedHandler = () => this._updateColors();

    window.addEventListener('palette-applied', this._paletteAppliedHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('palette-applied', this._paletteAppliedHandler);
  }

  willUpdate(changedProperties) {
    // Update properties from config.
    if (changedProperties.has('config')) {
      // Allow config object to set any public property.
      for (const prop in KatapultButton.properties) {
        // Skip any private properties.
        if (KatapultButton.properties[prop].state || prop == 'config') continue;
        if (this.config?.[prop] != null || changedProperties.get('config')?.[prop] != null) this[prop] = this.config?.[prop];
      }
    }

    // Update busy.
    this.busy = this.disabled || this.loading || (this.success && this.disabledOnSuccess) || (this.error && this.disabledOnError);

    // Handle icon change.
    if (changedProperties.has('icon')) {
      // Make a copy of the icon array where all icons are hidden.
      const temp = this._iconArray.map((x) => {
        // Hide icons that are not yet hidden.
        if (!x.hide) {
          // Set hide and animate flags to initiate the removal animation.
          x.hide = true;
          // Remove the icon once it's animation has finished.
          x.timeout = setTimeout(() => (this._iconArray = this._iconArray.filter((y) => y != x)), 300);
        }
        return x;
      });
      // If we have a new icon, add it to the array.
      if (this.icon) {
        // Build a new icon object and hide it.
        const item = { icon: this.icon, key: uuidv4(), hide: true };
        // Add it to the list of icons.
        temp.push(item);
        // Immediately set the item to visible (but async so it animates to visible).
        setTimeout(() => {
          this._iconArray = this._iconArray.map((x) => {
            if (item == x) x.hide = false;
            return x;
          });
        });
      }
      // Set the icon array.
      this._iconArray = temp;
    }

    // Handle legacy properties.
    if (changedProperties.has('iconButton')) {
      this.iconOnly = this.iconButton;
      if (this.iconButton) console.warn('iconButton is deprecated.  Please use iconOnly instead');
    }
    if (changedProperties.has('noOutline')) {
      this.noBorder = this.noOutline;
      if (this.noOutline) console.warn('noOutline is deprecated.  Please use noBorder instead');
    }

    // Update computed internal properties.
    this._size = KatapultIcon.calcSize(this.size);

    // Update size.
    if (changedProperties.has('_size')) {
      this.style.setProperty('--katapult-button-size', `${this._size}px`);
      this.style.setProperty('--katapult-button-font-size', `${(Number(this._size) * 2) / 3}px`);
    }

    // Update colors.
    if (
      [
        '_palette',
        'backgroundColor',
        'borderColor',
        'color',
        'disabled',
        'error',
        'noBackground',
        'noBorder',
        'outlined',
        'textColor',
        'loading',
        'success'
      ].some((x) => changedProperties.has(x))
    ) {
      this._updateColors();
    }

    if (['message', 'error', 'errorMessage', 'success', 'successMessage'].some((x) => changedProperties.has(x))) {
      // Determine which message to show (if any).
      let message;
      if (this.error && this.errorMessage) message = this.errorMessage;
      else if (this.success && this.successMessage) message = this.successMessage;
      // Let the message be the most recent message (don't update if null).
      if (message) this._message = message;
      // Show the message if there is one.
      this._showMessage = message != null;
    }

    if (changedProperties.has('_animate')) {
      this.style.setProperty(
        '--katapult-button-transition',
        this._animate
          ? 'font-size 0.3s, color 0.3s, background 0.3s, height 0.3s, width 0.3s, border 0.3s, border-radius 0.3s cubic-bezier(0.2, 0.8, 0.2, 0.8)'
          : ''
      );
    }
  }

  updated() {
    if (!this.iconOnly) {
      // Observe the label element for changes.
      if (!this._labelElement?.isConnected) {
        this._labelElement = this.renderRoot.querySelector('#label');
        if (this._labelElement) this._resizeObserver.observe(this._labelElement);
      }
      if (!this._messageCollapseElement?.isConnected) {
        this._messageCollapseElement = this.renderRoot.querySelector('#messageCollapse');
      }
    }
  }

  async _clickHandler(e) {
    // Do nothing if the button is busy.
    if (this.busy) return;

    // TODO: Kill this off entierly after the imminent fall of the Polymer empire.  ✊ Long live Lit! ✊
    // Handle the case where the button is inside a polymer template (a `dom-repeat` or other repeated template Polymer element like `iron-list`).
    // First, see if the current target is a Polymer element and has a data host.  If so, set the event's model to be the dataHost property.
    const dataHost = e.currentTarget.__dataHost;
    if (dataHost instanceof TemplateInstanceBase) e.model = dataHost;
    // Otherwise, walk up the DOM tree until we find an element with a template instance and set the event's model to be the this instance.
    let templateElement = e.currentTarget;
    while (templateElement != null && e.model == null) {
      const templateInstance = templateElement.__templatizeInstance ?? templateElement.__templateInstance;
      // only set the model if we find a templateInstance that has data
      if (templateInstance != null && Object.values(templateInstance.__data ?? {}).length != 0) e.model = templateInstance;
      templateElement = templateElement.parentNode;
    }

    // Clear error and success flags.
    this.error = this.success = false;
    // If there is no callback, return.
    if (this.callback == null) return;
    // If callback is a function, call it, otherwise, see if it points to a function on the __dataHost.
    let callback;
    switch (typeof this.callback) {
      case 'function':
        callback = this.callback;
        break;
      case 'string':
        const host = this.getRootNode().host;
        // Make sure host is defined.
        if (host == null) {
          console.warn('Failed to find host');
          break;
        }
        // Try to find the callback on the parent polymer element.
        const temp = host[this.callback];
        // If no callback is found, log a warning.
        if (temp == null) {
          console.warn(`Method \`${this.callback}\` not found on host`);
          break;
        }
        // Otherwise, bind the parent polymer element to the callback.
        callback = temp.bind(host);
        break;
    }
    // If we have a callback, call it.
    if (callback) {
      try {
        this.loading = true;
        const res = await callback(e);
      } catch (err) {
        if (!this.noError && !this.error) this.showError();
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }

  reset() {
    this.success = false;
    this.error = false;
  }

  showError(message, options) {
    // If message is not a string, assume it is the options object.
    if (typeof message !== 'string') {
      options = message ?? {};
      message = options.message;
    }
    // Get the duration from the options object.
    const duration = options?.duration ?? null;
    this.error = true;
    this.errorMessage = message;
    if (duration != null && duration < Infinity) {
      window.clearTimeout(this._errorTimeout);
      this._errorTimeout = setTimeout(() => this.reset(), duration);
    }
  }

  showSuccess(message, options) {
    // If message is not a string, assume it is the options object.
    if (typeof message !== 'string') {
      options = message ?? {};
      message = options.message;
    }
    // Get the duration from the options object.
    const duration = options?.duration ?? 2e3;
    this.success = true;
    this.successMessage = message;
    if (duration != null && duration < Infinity) {
      window.clearTimeout(this._successTimeout);
      this._successTimeout = setTimeout(() => this.reset(), duration);
    }
  }

  _updateColors() {
    const color = this.color != null && this.color != '' ? this.color : null;

    // Calc default background color.
    let backgroundColor = this.backgroundColor ?? (this.outlined ? 'transparent' : color);
    // Calc default text color.
    let textColor = this.textColor ?? (this.outlined ? color : null) ?? KatapultButton.GetTextColor(color, this);
    // Clac default border color.
    let borderColor = this.borderColor ?? (this.outlined ? color : null) ?? KatapultButton.GetBorderColor(color, this);

    // Respect override flags.
    if (this.noBackground) backgroundColor = 'transparent';
    if (this.noBorder) borderColor = backgroundColor;

    // Set disabled styling.
    if (this.disabled || this.loading) {
      // If there is no background, simply reduce the opacity of the text/border.
      if (KatapultButton.GetColorTranslator(backgroundColor, this).A == 0) {
        let temp = KatapultButton.GetColorTranslator(textColor, this);
        textColor = temp.setA(temp.A * 0.5).RGBA;
        temp = KatapultButton.GetColorTranslator(borderColor, this);
        borderColor = KatapultButton.GetColorTranslator(borderColor, this).setA(temp.A * 0.5).RGBA;
      }
      // If there is a background, set the default disabled styling on everything.
      else {
        if (!this.noBackground) backgroundColor = 'rgba(255,255,255,0.5)';
        if (!this.noBorder) borderColor = 'rgba(0,0,0,0.06)';
        textColor = 'rgba(0,0,0,0.5)';
      }
    }
    // Set error styling.
    else if (this.error) {
      if (!this.noBackground) backgroundColor = 'var(--paper-red-50)';
      if (!this.noBorder) borderColor = 'var(--paper-red-500)';
      textColor = 'var(--paper-red-500)';
    }
    // Set success styling.
    else if (this.success) {
      if (!this.noBackground) backgroundColor = 'var(--paper-green-50)';
      if (!this.noBorder) borderColor = 'var(--paper-green-500)';
      textColor = 'var(--paper-green-500)';
    }

    // Set text color (to be used by icon).
    this._textColor = textColor;

    // Update properties.
    this.style.setProperty('--katapult-button-background', backgroundColor);
    this.style.setProperty('--katapult-button-color', textColor);
    this.style.setProperty('--katapult-button-border-color', borderColor);
  }
}

customElements.define('katapult-button', KatapultButton);
