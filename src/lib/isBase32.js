import assertString from './util/assertString';
import merge from './util/merge';

const base32 = /^[A-Z2-7]+={0,6}$/;
const crockfordBase32 = /^[A-HJKMNP-TV-Z0-9]+$/;

const defaultBase32Options = {
  crockford: false,
};

export default function isBase32(str, options) {
  assertString(str);
  options = merge(options, defaultBase32Options);

  if (options.crockford) {
    return crockfordBase32.test(str);
  }

  if (!base32.test(str) || str.length % 8 !== 0) return false;

  const padding = str.length - str.replace(/=+$/, '').length;
  return padding === 0 || padding === 1 || padding === 3 || padding === 4 || padding === 6;
}
