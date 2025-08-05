import {css} from 'lit';
export const KatapultScrollbars = css`
  ::-webkit-scrollbar {
      width: 8px;
      height:8px;
      background: var(--paper-grey-200);
  }

  ::-webkit-scrollbar-track {
      /* -webkit-box-shadow: inset 0 0 3px #717271; */
  }

  ::-webkit-scrollbar-thumb {
      background: var(--paper-grey-400);
  }
`;
