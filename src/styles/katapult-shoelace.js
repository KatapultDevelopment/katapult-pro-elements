import {css} from 'lit';
export const KatapultShoelace = css`
/* Attribute styles */
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
/* SlSelect Material Style */
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