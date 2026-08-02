import trim from './trim';
import isEmail from './isEmail';
import assertString from './util/assertString';

function parseMailtoQueryString(queryString) {
  const allowedParams = new Set(['subject', 'body', 'cc', 'bcc']),
    query = { cc: '', bcc: '' };
  let isParseFailed = false;

  const queryParams = queryString.split('&');

  if (queryParams.length > 4) {
    return false;
  }

  for (const q of queryParams) {
    if (q) {
      const separator = q.indexOf('=');
      if (separator === -1) {
        isParseFailed = true;
        break;
      }

      const key = q.slice(0, separator);
      const value = q.slice(separator + 1);

      if (value.includes('\u0000')) {
        isParseFailed = true;
        break;
      }

      // checked for invalid and duplicated query params
      if (!key || !allowedParams.has(key)) {
        isParseFailed = true;
        break;
      }

      if (value && (key === 'cc' || key === 'bcc')) {
        query[key] = value;
      }

      allowedParams.delete(key);
    }
  }

  return isParseFailed ? false : query;
}

export default function isMailtoURI(url, options) {
  assertString(url);

  if (url.slice(0, 'mailto:'.length).toLowerCase() !== 'mailto:') {
    return false;
  }

  const [to, queryString = ''] = url.slice('mailto:'.length).split('?');

  if (!to && !queryString) {
    return true;
  }

  const query = parseMailtoQueryString(queryString);

  if (!query) {
    return false;
  }

  return `${to},${query.cc},${query.bcc}`
    .split(',')
    .every((email) => {
      email = trim(email, ' ');

      if (email) {
        return isEmail(email, options);
      }

      return true;
    });
}
