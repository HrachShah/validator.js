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
        'example..com',
        '.example.com',
        'example.com.',
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
        'example..com',
        '.example.com',
        'example.com.',
      ],
    });
    test({
      validator: 'isFQDN',
      args: [{ allow_trailing_dot: true }],
      valid: ['example.com.'],
      invalid: ['example..com.', '.example.com'],
    });
  });
});
