import assertString from './util/assertString';
import isNullOrUndefined from './util/nullUndefinedCheck';
import { decimal } from './alpha';

export default function isFloat(str, options) {
  assertString(str);
  options = options || {};
  const float = new RegExp(`^(?:[-+])?(?:[0-9]+)?(?:\\${options.locale ? decimal[options.locale] : '.'}[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$`);
  if (str === '' || str === '.' || str === ',' || str === '-' || str === '+') {
    return false;
  }
  const value = parseFloat(str.replace(',', '.'));
  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  return float.test(str) &&
    (!hasOwn(options, 'min') || isNullOrUndefined(options.min) || value >= options.min) &&
    (!hasOwn(options, 'max') || isNullOrUndefined(options.max) || value <= options.max) &&
    (!hasOwn(options, 'lt') || isNullOrUndefined(options.lt) || value < options.lt) &&
    (!hasOwn(options, 'gt') || isNullOrUndefined(options.gt) || value > options.gt);
}

export const locales = Object.keys(decimal);
