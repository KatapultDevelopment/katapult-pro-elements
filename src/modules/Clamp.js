export function Clamp(num, min, max) {
  if (max == null) max = Infinity;
  if (min == null) min = -Infinity;
  return num > max ? max : num < min ? min : num;
}
