import assertString from './util/assertString';
import toString from './util/toString';
import merge from './util/merge';

const defaultContainsOptions = {
  ignoreCase: false,
  minOccurrences: 1,
};

export default function contains(str, elem, options) {
  assertString(str);
  options = merge(options, defaultContainsOptions);

  const elemStr = toString(elem);
  if (!elemStr) return false;

  if (options.ignoreCase) {
    return str.toLowerCase().split(elemStr.toLowerCase()).length > options.minOccurrences;
  }

  return str.split(elemStr).length > options.minOccurrences;
}
