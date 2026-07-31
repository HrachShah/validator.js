import assert from 'assert';
import isByteLength from '../src/lib/isByteLength';

describe('isByteLength defaults', () => {
  it('returns true for empty string when called with no args', () => {
    assert.strictEqual(isByteLength(''), true);
  });

  it('returns true for ASCII strings when called with no args', () => {
    assert.strictEqual(isByteLength('a'), true);
    assert.strictEqual(isByteLength('abc'), true);
    assert.strictEqual(isByteLength('hello world'), true);
  });

  it('returns true for multibyte strings when called with no args', () => {
    assert.strictEqual(isByteLength('ｇ'), true);
    assert.strictEqual(isByteLength('ｇｍ'), true);
  });

  it('matches isLength behavior when called with no args', () => {
    const samples = ['', 'a', 'abc', 'ｇ', 'ｇｍ'];
    const isLength = require('../src/lib/isLength').default;
    for (const sample of samples) {
      assert.strictEqual(
        isByteLength(sample),
        isLength(sample),
        `isByteLength/isLength parity for ${JSON.stringify(sample)}`,
      );
    }
  });
});