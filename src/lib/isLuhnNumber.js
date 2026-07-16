import assertString from './util/assertString';

export default function isLuhnNumber(str) {
  assertString(str);
  const sanitized = str.replace(/[- ]+/g, '');
  if (!sanitized) return false;
  let sum = 0;
  let digit;
  let tmpNum;
  let shouldDouble;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, (i + 1));
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += ((tmpNum % 10) + 1);
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  const isValid = sum % 10 === 0;
  return !!isValid;
}

