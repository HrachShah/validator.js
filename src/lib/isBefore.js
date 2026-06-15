import toDate from './toDate';

export default function isBefore(date, options) {
  // For backwards compatibility:
  // isBefore(str [, date]), i.e. `options` could be used as argument for the legacy `date`
  // Use optional chaining so passing `null` (typeof null === 'object') doesn't crash with
  // "Cannot read properties of null"; null and undefined both fall through to the Date() default.
  const comparisonDate = (options && typeof options === 'object' ? options.comparisonDate : options) || Date().toString();

  const comparison = toDate(comparisonDate);
  const original = toDate(date);

  return !!(original && comparison && original < comparison);
}
