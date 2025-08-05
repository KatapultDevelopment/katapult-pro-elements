# Katapult Pro Elements
A web component library for both internal and external development, built with [Lit](https://lit.dev/docs/) and [Shoelace](https://shoelace.style/).

#### `<katapult-searchable-dropdown>`
- Dropdown component for selecting from a list of items (supports filtering).
- Slots: 
  - `slot="label"`
  - `slot="prefix"`
  - `slot="suffix"`
  - `slot="help-text"`
- Properties:
  - Boolean `stayOpenOnSelect`, attribute name `stay-open-on-select`
  - Boolean `autoFilter`, attribute name `auto-filter`
  - Boolean `lookLikePaperElement`, attribute name `look-like-paper-element`
  - Boolean `open`
  - Boolean `hoist`
  - Boolean `filled`
  - Boolean `pill`
  - Boolean `clearable`
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
```js
import '@katapult-engineering/elements/katapult-searchable-dropdown.js';
```
