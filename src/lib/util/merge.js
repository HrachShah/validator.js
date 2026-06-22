export default function merge(obj = { }, defaults) {
  // The original guard `typeof obj !== 'object' || obj === null` only caught
  // null and primitives. `typeof [] === 'object'`, `typeof new Date() === 'object'`,
  // and `typeof new Map() === 'object'`, so an array, Date, or Map passed as `obj`
  // fell through and got its elements/slots written to by the for-in loop
  // below — `merge([1, 2, 3], { a: 1 })` mutated the array to `[1, 2, 3, a: 1]`,
  // `merge(new Date(), { a: 1 })` added an `a` property to the Date instance,
  // and `merge(new Map([['x', 1]]), { a: 1 })` added a string key to the map.
  // The fix is to also reject arrays (the only object form we can reject by
  // type-check that's plausibly a user mistake; the function's API doc says
  // obj is a plain object).
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    obj = {};
  }
  for (const key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
