import assertString from './util/assertString';
import isNullOrUndefined from './util/nullUndefinedCheck';
import { decimal } from './alpha';

export default function isFloat(str, options) {
  assertString(str);
  options = options || {};
  const decimalSeparator = options.locale ? decimal[options.locale] : '.';
  const float = new RegExp(`^(?:[-+])?(?:[0-9]+)?(?:\\${decimalSeparator}[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$`);
  if (str === '' || str === '.' || str === ',' || str === '-' || str === '+') {
    return false;
  }
  // Only replace the locale's actual decimal separator — not every comma.
  // This prevents en-US "1,000" from becoming "1.000" and mis-parsing as 1.0.
  const normalized = decimalSeparator !== '.' ? str.replace(decimalSeparator, '.') : str;
  const value = parseFloat(normalized);
  return float.test(str)
    && (options.min === undefined || isNullOrUndefined(options.min) || value >= options.min)
    && (options.max === undefined || isNullOrUndefined(options.max) || value <= options.max)
    && (options.lt === undefined || isNullOrUndefined(options.lt) || value < options.lt)
    && (options.gt === undefined || isNullOrUndefined(options.gt) || value > options.gt);
}

export const locales = Object.keys(decimal);
