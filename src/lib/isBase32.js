import assertString from './util/assertString';
import merge from './util/merge';

const base32 = /^[A-Z2-7]+=*$/;
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

  if (str.length === 0 || str.length % 8 !== 0 || !base32.test(str)) return false;

  const padding = str.indexOf('=');
  if (padding === -1) return true;

  const paddingLength = str.length - padding;
  const dataLength = padding % 8;
  return [2, 4, 5, 7].includes(dataLength) &&
    [1, 3, 4, 6].includes(paddingLength) &&
    !str.slice(0, padding).includes('=');
}
