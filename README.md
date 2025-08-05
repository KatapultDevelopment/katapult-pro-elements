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
  - `open`: Boolean
  - `placement`: String
  - `stayOpenOnSelect`, attribute name `stay-open-on-select`: Boolean
  - `containingElement`: Object
  - `hoist`: Boolean
  - `autocomplete`: String
  - `size`: String
  - `filled`: Boolean
  - `pill`: Boolean
  - `label`: String
  - `helpText`: String
  - `clearable`: Boolean
  - `placeholder`: String
  - `disabled`: Boolean
  - `items`: Array
  - `value`: String
  - `renderItem`: Function
  - `autoFilter`, attribute name `auto-filter`: Boolean
  - `lookLikePaperElement`, attribute name `look-like-paper-element`: Boolean
```js
import '@katapult-engineering/elements/katapult-searchable-dropdown.js';
```
