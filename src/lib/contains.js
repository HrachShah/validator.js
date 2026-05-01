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
  if (!search) {
    return false;
  }

  if (options.ignoreCase) {
    return str.toLowerCase().split(search.toLowerCase()).length > options.minOccurrences;
  }

  return str.split(search).length > options.minOccurrences;
}
