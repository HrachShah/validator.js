export default function merge(obj = { }, defaults) {
  if (typeof obj !== 'object' || obj === null) {
    obj = {};
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  for (const key in defaults) {
    if (typeof result[key] === 'undefined') {
      result[key] = defaults[key];
    }
  }
  return result;
}
