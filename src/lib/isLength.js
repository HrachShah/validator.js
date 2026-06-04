import assertString from './util/assertString';

/* eslint-disable prefer-rest-params */
export default function isLength(str, options) {
  assertString(str);
  let min;
  let max;

  if (options !== null && typeof (options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else { // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }

  const presentationSequences = str.match(/[^\uFE0F\uFE0E][\uFE0F\uFE0E]/g) || [];
  const surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  const len = str.length - presentationSequences.length - surrogatePairs.length;
  const isInsideRange = len >= min && (typeof max === 'undefined' || len <= max);

  // discreteLengths is only meaningful when the caller passed an options object.
  // Without this guard, isLength('test', null) would throw a TypeError on
  // `null.discreteLengths` for any string that fell inside the default range.
  if (isInsideRange && options !== null && Array.isArray(options?.discreteLengths)) {
    return options.discreteLengths.some(discreteLen => discreteLen === len);
  }

  return isInsideRange;
}
