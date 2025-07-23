import {css} from 'lit';
export const KatapultShoelace = css`
// Default styles for the elements
    :host {
        --header-spacing: 16px !important;
        --body-spacing: 8px 16px !important;
        --footer-spacing: 16px !important;
    }
    sl-dialog::part(panel) {
        border-radius: 16px;
    }
    sl-dialog::part(body), sl-dialog::part(footer), sl-dialog::part(title) {
        padding: 16px;
    }
    sl-button::part(label) {
        font-family: Roboto;
        font-size: 16px;
        font-weight: normal;
        color: var(--sl-color-gray-500);
    }
    sl-button::part(base) {
        border-radius: 16px !important;
        border-color: var(--sl-color-gray-200);
    }
    sl-input::part(base) {
        box-shadow: none !important;
        font-family: Roboto;
        outline: none;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid var(--sl-color-gray-500);
    }
    sl-input::part(form-control-label) {
        font-size: 12px;
    }
    sl-input::part(password-toggle-button),
    sl-input::part(clear-button) {
        width: fit-content;
        padding: 0 4px;
    }
    sl-icon-button::part(base):hover {
        color: var(--secondary-color, black) !important;
    }
    sl-menu {
        border: none;
        border-radius: 16px;
    }
    sl-icon-button::part(base) {
        padding: 0;
    }
    sl-dropdown::part(panel) {
        background: white;
        border-radius: 16px;
    }
    sl-alert::part(icon) {
        color: var(--accent-color, red);
    }
    sl-alert::part(base) {
        border-top-color: var(--accent-color, red);
    }
    sl-checkbox::part(label) {
        font-family: Roboto !important;
    }

// Attribute styles
    sl-dialog[no-x]::part(close-button) {
        display: none;
    }
    sl-dialog[no-actions]::part(header-actions) {
        display: none;
    }
    sl-dialog[filled]::part(header) {
        color: white;
        border-radius: 16px 16px 0 0;
        background: var(--primary-color, var(--sl-color-gray-500));
    }
    sl-dialog[filled]::part(title) {
        color: white;
        border-radius: 16px 16px 0 0;
        background: var(--primary-color, var(--sl-color-gray-500));
    }
    sl-dialog[centered]::part(header) {
        text-align: center;
    }
// Primary Buttons
    sl-button[variant='primary'] {
        background-color: var(--primary-color, var(--sl-color-gray-500));
    }
    sl-button[variant='primary']::part(label) {
        color: white;
    }
    sl-button[variant='primary']::part(base) {
        background-color: var(--primary-color, var(--sl-color-gray-500));
    }
    sl-button[variant='primary']::part(base):hover {
        background-color: var(--secondary-color, var(--sl-color-gray-600));
        border-color: var(--secondary-color, var(--sl-color-gray-600));
        color: var(--primary-color, var(--sl-color-gray-600));
    }
    sl-button[variant='primary']:hover {
        color: var(--primary-color, var(--sl-color-gray-600));
    }
// Default Buttons
    sl-button[variant='default']::part(base) {
        background: white !important;
    }
    sl-button[variant='default']::part(base):hover {
        border-color: var(--primary-color, var(--sl-color-gray-400));
        color: var(--primary-color, var(--sl-color-gray-600));
        background: white !important;
    }
    sl-button[variant='default'] {
        color: var(--sl-color-gray-400);
    }
    sl-button[variant='default']:hover {
        color: var(--primary-color, var(--sl-color-gray-600));
    }
    sl-button[variant='default']::part(label) {
        color: var(--sl-color-gray-600);
    }
    sl-button[variant='default']::part(label):hover {
        color: var(--primary-color, var(--sl-color-gray-600));
    }
    sl-icon[small] {
        font-size: 20px;
    }
    sl-icon[nine-dot] {
        font-size: 30px;
    }
    sl-icon[default] {
        color: var(--primary-color, var(--sl-color-gray-700));
        font-size: 24px;
    }
    sl-icon-button[toolbar]::part(base) {
        color: var(--primary-color, var(--sl-color-gray-700));
        font-size: 24px;
    }
    sl-checkbox[checked]::part(control) {
        border-color: var(--primary-color, var(--sl-color-gray-600));
        background-color: var(--primary-color, var(--sl-color-gray-600));
    }
// SlSelect Material Style
    sl-select[look-like-paper-element]::part(combobox) {
        border: none;
        --sl-input-placeholder-color: var(--sl-color-neutral-600);
        --sl-focus-ring-width: 0;
        background: none;
    }
    sl-select[look-like-paper-element]::part(expand-icon) {
        height: 0;
        width: 0;
        border-top: 5px solid var(--sl-color-primary);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    sl-dropdown[look-like-paper-element] sl-button::part(base) {
        border: none;
        --sl-input-placeholder-color: var(--sl-color-neutral-600);
        --sl-focus-ring-width: 0;
        background: none;
        font-size: 16px;
        color: var(--primary-text-color);
        font-weight: normal;
    }
    sl-dropdown[look-like-paper-element] sl-button::part(caret) {
        align-self: center;
        height: 0;
        width: 0;
        border-top: 5px solid var(--sl-color-primary);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    /* SlInput Material Style */
    sl-input[look-like-paper-element]::part(base) {
        border: none;
        --sl-focus-ring-width: 0;
    }
    sl-input[look-like-paper-element]::part(input) {
        border-bottom: var(--sl-input-paper-border-bottom-width, 1px) solid var(--sl-color-neutral-900);
    }
    sl-input[look-like-paper-element]::part(input):focus {
        border-bottom: 2px solid var(--sl-color-primary);
    }
    /* Katapult Drop Down Material Style */
    katapult-dropdown[look-like-paper-element]::part(expand-icon) {
        height: 0;
        width: 0;
        border-top: 5px solid var(--sl-color-primary);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
`;