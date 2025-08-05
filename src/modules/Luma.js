/**
 * Calculates the Luma of an RGB color as specified by Rec. 709.
 * @param {Number} r Red between 0 and 255
 * @param {Number} g Green between 0 and 255
 * @param {Number} b Blue between 0 and 255
 * @returns {Number} Luma percentage between 0 and 100
 */
export function Luma(r, g, b) {
  return ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255) * 100;
}