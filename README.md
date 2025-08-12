# Katapult Pro Elements
A web component library for both internal and external development, built with [Lit](https://lit.dev/docs/) and [Shoelace](https://shoelace.style/).

#### `<katapult-searchable-dropdown>`
- Dropdown component for selecting from a list of items. This element supports filtering and can be navigated using keyboard shortcuts.
- Slots: 
  - `slot="label"`
  - `slot="prefix"`
    - Appears before the searchable section of the dropdown
  - `slot="suffix"`
    - Appears at the end of the searchable section, but before the dropdown arrow and the clear icon
  - `slot="help-text"`
- Properties:
  - Boolean `stayOpenOnSelect`, attribute name `stay-open-on-select`
    - Keeps the dropdown open when an item is selected from the list
  - Boolean `autoFilter`, attribute name `auto-filter`
    - Filters down the listed elements based on what the user types in the search section
  - Boolean `lookLikePaperElement`, attribute name `look-like-paper-element`
    - Formats the dropdown to look like the Polymer `paper-dropdown-menu`
  - Boolean `open`
    - Indicates if the dropdown section is opened (can be added on the element to start with it open)
  - Boolean `hoist`
  - Boolean `filled`
  - Boolean `pill`
    - Creates rounded corners for the dropdown
  - Boolean `clearable`
    - Includes an icon button that clears user input from the search
  - Boolean `disabled`
  - String `placement`
  - String `autocomplete`
  - String `size`
  - String `label`
  - String `helpText`
  - String `placeholder`
  - String `value`
  - Array `items`
  - Object `containingElement`
  - Function `renderItem`
    - Allows customization for how each item is rendered. It expects a function with the parameters `(item, index, array)` and returns a template or the HTML for that item.
```js
import '@katapult-engineering/elements/katapult-searchable-dropdown.js';
```
