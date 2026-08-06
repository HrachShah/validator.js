import assertString from './util/assertString';
import isNullOrUndefined from './util/nullUndefinedCheck';

const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
const intLeadingZeroes = /^[-+]?[0-9]+$/;

export default function isInt(str, options) {
  assertString(str);
  options = options || {};

  // Get the regex to use for testing, based on whether
  // leading zeroes are allowed or not.
  const regex = options.allow_leading_zeroes === false ? int : intLeadingZeroes;

  const value = Number(str);

  // Check min/max/lt/gt
  let minCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'min') || isNullOrUndefined(options.min) || value >= options.min);
  let maxCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'max') || isNullOrUndefined(options.max) || value <= options.max);
  let ltCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'lt') || isNullOrUndefined(options.lt) || value < options.lt);
  let gtCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'gt') || isNullOrUndefined(options.gt) || value > options.gt);

  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
