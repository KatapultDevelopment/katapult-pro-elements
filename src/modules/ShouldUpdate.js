/** @import { LitElement } from 'lit' */
/** @import { PropertyValues } from '@lit/reactive-element' */

/**
 * Determines whether the element should update based on property changes after ignoring any properties with `shouldUpdate` set to false.
 * @param {LitElement} elem The lit element which should may update
 * @param {PropertyValues} changedProperties Map of changed properties with old values
 * @returns {boolean} Whether the element should update or not
 */
export function ShouldUpdate(elem, changedProperties) {
  const updateCalledManually = changedProperties.size == 0;
  const nonIgnoredPropertiesHaveChanged = Array.from(changedProperties.keys()).some(
    (prop) => elem.constructor.properties[prop].shouldUpdate !== false
  );
  return updateCalledManually || nonIgnoredPropertiesHaveChanged;
}