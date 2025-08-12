# Katapult Pro Elements
A web component library for both internal and external development, built with [Lit](https://lit.dev/docs/) and [Shoelace](https://shoelace.style/).

## `<katapult-searchable-dropdown>`
- Dropdown component for selecting from a list of items. This element supports filtering and can be navigated using keyboard shortcuts.

### Slots

| Slot | Usage |
| -------- | ------- |
| `slot="label"`  | <ul><li>Displays above the dropdown to label the type of information in the list.</li><li>Typical label usage is via the label property, however the slot exists for more customization outside of plain text.</li><li>If both a label slot and label property exist, the slot will take priority (i.e. the property won't do anything).</li></ul> |
| `slot="prefix"` | <ul><li>Appears before the searchable section of the dropdown</li><li>Typical prefix usage slots in an icon</li></ul> |
| `slot="suffix"` | <ul><li>Appears at the end of the searchable section, but before the dropdown arrow and the clear icon</li><li>Typical suffix usage slots in an icon</li></ul> |
| `slot="help-text"` | <ul><li>Displays under the dropdown to give more users more context</li><li>Typical help text usage is via the helpText property, however the slot exists for more customization outside of plain text.</li><li>If both a help-text slot and helpText property exist, the slot will take priority (i.e. the property won't do anything).</li></ul> |

### Properties

| Name | Description | Type |
| -------- | ------- | ------- |
| <ul style="list-style-type: none; padding: 0;"><li>`stayOpenOnSelect`</li><li style="font-size: 12px;">`stay-open-on-select`</li></ul> | Keeps the dropdown open when an item is selected from the list | `Boolean` |
| <ul style="list-style-type: none; padding: 0;"><li>`autoFilter`</li><li style="font-size: 12px;">`auto-filter`</li></ul> | Filters down the listed elements based on what the user types in the search section | `Boolean` |
| <ul style="list-style-type: none; padding: 0;"><li>`lookLikePaperElement`</li><li style="font-size: 12px;">`look-like-paper-element`</li></ul> | Formats the dropdown to look like the Polymer `paper-dropdown-menu` | `Boolean` |
| `open` | Indicates if the dropdown section is opened (can be included in the element to start with it open) | `Boolean` |
| `hoist` | Allows the dropdown part of the element to go outside of the containing element | `Boolean` |
| `filled` | Fills the background with a grey color. The color is stored in `var(--sl-input-filled-background-color)` and can be changed by overwriting this css variable. | `Boolean` |
| `pill` | Creates rounded corners for the dropdown | `Boolean` |
| `clearable` | Includes an icon button that clears user input from the search | `Boolean` |
| `disabled` | Greys out the dropdown and stops users from interacting with it | `Boolean` |
| `placement` | <ul><li>Determines where the dropdown appears in relation to the search box</li><li>Options include `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `right` `right-start` `right-end` `left` `left-start` and `left-end`</li><li>This property gets its utility from Shoelace. To see how these locations appear, reference the [Placement](https://shoelace.style/components/popup#placement) section of Shoelace's Popup component</li></ul> | `String` |
| `autocomplete` | <ul><li>Indicates to the browser what it can try to autofill. This would include filling in data such as someone's name, address, or phone number based on their saved personal information.</li><li>This could be used to select someone's name from a dropdown of listed users, for example.</li><li>Refer to potential values [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)</li></ul> | `String` |
| `size` | <ul><li>Controls the size of the search element.</li><li>Options include `small` `medium` and `large`</li></ul> | `String` |
| `label` | The plain text value to place above the input, to descibe the dropdown | `String` |
| `helpText` | The plain text placed under the input, to help users further understand the dropdown content | `String` |
| `placeholder` | The plain text that appears in the input section when nothing has been typed yet | `String` |
| `value` | Indicates the currently selected item in the list. Note: The value and label attributes aren't necessarily the same unless you make them the same. An item's label represents what is displayed in the dropdown, while it's value indicates what it represents. | `String` |
| `items` | <ul><li>The data to populate the dropdown. This should include label value pairs.</li><li>The value is the data you will likely extract from the dropdown to determine next actions (such as opening a specific page or doing calculations)</li><pre><code>[</br>  {label: 'HR', value: '_hr_attribute_path'},<br/>  {label: 'Internal Ops', value: '_interops_attribute_path'}<br/>]</code></pre></ul>| `Array` |
| `containingElement` | The element that determines where a dropdown can appear. The formatting follows the normal DOM by default. This property is used for edge cases or for clipping a dropdown that doesn't use `hoist` | `Object` |
| `renderItem` | <ul><li>Allows customization for how each item is rendered. This property expects a function with parameters indicating the current item, its index, and an array of the items (after being filtered if autoFilter is enabled), as well HTML in the return.</li><pre><code>function (item, index, arr) {<br/>   return html\`<sl-menu-item value=${item.value} \?disabled=\${item.disabled}>\${item.label}</sl-menu-item>\`;<br/>}</code></pre></ul> | `Function` |

### Import Statement
```js
import '@katapult-engineering/elements/katapult-searchable-dropdown.js';
```
