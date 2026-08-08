import test from '../testFunctions';

describe('isMailtoURI', () => {
  it('preserves equals signs in query values', () => {
    test({
      validator: 'isMailtoURI',
      valid: [
        'mailto:info@mail.com?subject=a=b',
        'mailto:?body=https://example.com?a=b',
      ],
    });
  });

  it('rejects empty query fields between parameters', () => {
    test({
      validator: 'isMailtoURI',
      invalid: [
        'mailto:info@mail.com?subject=hello&&body=world',
      ],
    });
  });
});
