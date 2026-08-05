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

  const search = toString(elem);
  if (
    search.length === 0
    || !Number.isInteger(options.minOccurrences)
    || options.minOccurrences < 1
  ) {
    return false;
  }

  if (options.ignoreCase) {
    return str.toLowerCase().split(search.toLowerCase()).length > options.minOccurrences;
  }

  return str.split(search).length > options.minOccurrences;
}
