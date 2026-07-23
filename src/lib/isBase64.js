import assertString from './util/assertString';
import merge from './util/merge';

const base64WithPadding = /^[A-Za-z0-9+/]+={0,2}$/;
const base64WithoutPadding = /^[A-Za-z0-9+/]+$/;
const base64UrlWithPadding = /^[A-Za-z0-9_-]+={0,2}$/;
const base64UrlWithoutPadding = /^[A-Za-z0-9_-]+$/;
const standardAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const urlAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export default function isBase64(str, options) {
  assertString(str);
  options = merge(options, { urlSafe: false, padding: !options?.urlSafe });

  if (str === '') return true;

  if (str.length % 4 === 1 || (options.padding && str.length % 4 !== 0)) return false;

  let regex;
  if (options.urlSafe) {
    regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;
  } else {
    regex = options.padding ? base64WithPadding : base64WithoutPadding;
  }

  if ((!options.padding || str.length % 4 === 0) && regex.test(str)) {
    let padding = 0;
    if (str.endsWith('==')) padding = 2;
    else if (str.endsWith('=')) padding = 1;
    const significantLength = str.length - padding;
    const remainder = significantLength % 4;
    if (remainder === 0) return true;
    const alphabet = options.urlSafe ? urlAlphabet : standardAlphabet;
    const value = alphabet.indexOf(str[significantLength - 1]);
    return remainder === 2 ? value % 16 === 0 : value % 4 === 0;
  }
  return false;
}
