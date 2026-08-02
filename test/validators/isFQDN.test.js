import test from '../testFunctions';

describe('isFQDN', () => {
  it('should validate domain names.', () => {
    test({
      validator: 'isFQDN',
      args: [],
      valid: [
        'google.com',
      ],
      invalid: [
        'google.l33t',
        `${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(61)}.com`,
      ],
    });
    test({
      validator: 'isFQDN',
      args: [{ allow_numeric_tld: true }],
      valid: [
        'google.com',
        'google.l33t',
      ],
      invalid: [
      ],
    });
  });
});
