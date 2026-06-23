/**
 * Better way to handle type checking
 * null, {}, array and date are objects, which confuses
 */
const TYPE_OF_REGEX = /\[object (.*)]/;

export default function typeOf(input) {
  const rawObject = Object.prototype.toString.call(input).toLowerCase();
  const type = TYPE_OF_REGEX.exec(rawObject)[1];
  return type;
}
