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

  // Check min/max/lt/gt
  let minCheckPassed =
    options.min === undefined || isNullOrUndefined(options.min) || str >= options.min;
  let maxCheckPassed =
    options.max === undefined || isNullOrUndefined(options.max) || str <= options.max;
  let ltCheckPassed =
    options.lt === undefined || isNullOrUndefined(options.lt) || str < options.lt;
  let gtCheckPassed =
    options.gt === undefined || isNullOrUndefined(options.gt) || str > options.gt;

  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
