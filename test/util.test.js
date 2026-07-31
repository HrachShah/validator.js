/**
 * All tests that tests any utility.
 * Prevent any breaking of functionality
 */
import assert from 'assert';
import typeOf from '../src/lib/util/typeOf';
import assertString from '../src/lib/util/assertString';
import merge from '../src/lib/util/merge';


describe('Util', () => {
  it('should validate different typeOf', () => {
    assert.strictEqual(typeOf([]), 'array');
    assert.strictEqual(typeOf(null), 'null');
    assert.strictEqual(typeOf({}), 'object');
    assert.strictEqual(typeOf(new Date()), 'date');
    assert.strictEqual(typeOf('ezkemboi'), 'string');
    assert.strictEqual(typeOf(String('kemboi')), 'string');
    assert.strictEqual(typeOf(undefined), 'undefined');
    assert.strictEqual(typeOf(2021), 'number');
    assert.notStrictEqual(typeOf([]), 'object');
  });
});

describe('assertString', () => {
  it('Should throw an error if argument provided is an undefined', () => {
    assert.throws(() => { assertString(); }, TypeError);
  });

  it('Should throw an error if argument provided is a null', () => {
    assert.throws(() => { assertString(null); }, TypeError);
  });

  it('Should throw an error if argument provided is a Boolean', () => {
    assert.throws(() => { assertString(true); }, TypeError);
  });

  it('Should throw an error if argument provided is a Date', () => {
    assert.throws(() => { assertString(new Date()); }, TypeError);
  });

  it('Should throw an error if argument provided is a Number(NaN)', () => {
    assert.throws(() => { assertString(NaN); }, TypeError);
  });

  it('Should throw an error if argument provided is a Number', () => {
    assert.throws(() => { assertString(2024); }, TypeError);
  });

  it('Should throw an error if argument provided is an Object', () => {
    assert.throws(() => { assertString({}); }, TypeError);
  });

  it('Should throw an error if argument provided is an Array', () => {
    assert.throws(() => { assertString([]); }, TypeError);
  });

  it('Should not throw an error if the argument is an empty string', () => {
    assert.doesNotThrow(() => { assertString(''); });
  });

  it('Should not throw an error if the argument is a String', () => {
    assert.doesNotThrow(() => { assertString('antidisestablishmentarianism'); });
  });
});

describe('merge', () => {
  it('should fill missing keys from defaults into a plain object', () => {
    assert.deepStrictEqual(merge({ a: 1 }, { a: 2, b: 3 }), { a: 1, b: 3 });
  });

  it('should treat undefined obj as an empty object', () => {
    assert.deepStrictEqual(merge(undefined, { a: 1 }), { a: 1 });
  });

  it('should treat null obj as an empty object', () => {
    assert.deepStrictEqual(merge(null, { a: 1 }), { a: 1 });
  });

  it('should not mutate an array passed as obj', () => {
    const arr = [1, 2, 3];
    merge(arr, { a: 1 });
    assert.deepStrictEqual(arr, [1, 2, 3]);
  });

  it('should return a fresh object when obj is an array', () => {
    const result = merge([1, 2, 3], { a: 1 });
    assert.deepStrictEqual(result, { a: 1 });
    assert.ok(!Array.isArray(result));
  });
});
