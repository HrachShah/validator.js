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

  const number = Number(str);

  // Check min/max/lt/gt
  let minCheckPassed = (!options.hasOwnProperty('min') || isNullOrUndefined(options.min) || number >= options.min);
  let maxCheckPassed = (!options.hasOwnProperty('max') || isNullOrUndefined(options.max) || number <= options.max);
  let ltCheckPassed = (!options.hasOwnProperty('lt') || isNullOrUndefined(options.lt) || number < options.lt);
  let gtCheckPassed = (!options.hasOwnProperty('gt') || isNullOrUndefined(options.gt) || number > options.gt);

  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
