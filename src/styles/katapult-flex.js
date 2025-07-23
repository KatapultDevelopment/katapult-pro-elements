import {css} from 'lit';
export const KatapultFlex = css`
  [flex] {
    display: flex;
  }
  [column] {
    flex-direction: column;
  }
  [overflow-hidden] {
    overflow: hidden;
  }
  [overflow] {
    overflow: unset;
  }
  [align-start] {
    align-items: flex-start;
  }
  [align-end] {
    align-items: flex-end;
  }
  [align-center] {
    align-items: center;
  }
  [align-stretch] {
    align-items: stretch;
  }
  [justify-start] {
    justify-content: flex-start;
  }         
  [justify-center] {
    justify-content: center;
  }
  [justify-end] {
    justify-content: flex-end;
  }
  [justify-space-between], [space-between] {
    justify-content: space-between;
  }
  [justify-stretch] {
    justify-content: stretch;
  }
  [spacer], [grow] {
    flex-grow: 1;
  }
  [spacer]:not([collapse]) {
    min-width: 16px;
  }
  [line] {
    border-bottom: 1px solid var(--border-color);
  }
  [text-center], p[center] {
    text-align: center;
  }
  [pointer]:hover {
    cursor: pointer;
  }
  [grab]:hover {
    cursor: grab;
  }
  [faded] {
    opacity: 0.8;
  }
  [border-box] {
    box-sizing: border-box;
  }
  [wrap] {
    flex-wrap: wrap;
  }
  [italic] {
    font-style: italic;
  }
  [lighter] {
    font-weight: lighter;
  }
  [bold] {
    font-weight: bold;
  }
  [no-shrink] {
    flex-shrink: 0;
  }
  [no-grow] {
    flex-grow: 0;
  }
  [align-self-center] {
    align-self: center;
  }
  [align-self-stretch] {
    align-self: stretch;
  }
  [buttons-container] {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }
  [buttons-container] katapult-button:not(:last-of-type) {
    margin-right: 16px;
  }
  [drag-handle]:hover {
    cursor: grab;
  }
  [drag-handle]:active {
    cursor: grabbing;
  }   
  [no-user-select] {
    user-select: none;
    -webkit-user-select: none; /* Safari */
  }
  [width-fill-available] {
    width: -webkit-fill-available;
  }
`;