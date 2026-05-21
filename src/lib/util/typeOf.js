/**
 * Better way to handle type checking
 * null, {}, array and date are objects, which confuses
 */
var TYPE_OF_REGEX = /\[object (.*)]/i;

export default function typeOf(input) {
  var rawObject = Object.prototype.toString.call(input).toLowerCase();
  var type = TYPE_OF_REGEX.exec(rawObject)[1];
  return type;
}
