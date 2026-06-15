import test from '../testFunctions';

describe('isAfter', () => {
  it('should validate dates against a start date', () => {
    test({
      validator: 'isAfter',
      args: [{ comparisonDate: '2011-08-03' }],
      valid: ['2011-08-04', new Date(2011, 8, 10).toString()],
      invalid: ['2010-07-02', '2011-08-03', new Date(0).toString(), 'foo'],
    });

    test({
      validator: 'isAfter',
      valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
      invalid: ['2010-07-02', new Date(0).toString()],
    });

    test({
      validator: 'isAfter',
      args: [{ comparisonDate: '2011-08-03' }],
      valid: ['2015-09-17'],
      invalid: ['invalid date'],
    });

    test({
      validator: 'isAfter',
      args: [{ comparisonDate: 'invalid date' }],
      invalid: ['invalid date', '2015-09-17'],
    });
    test({
      validator: 'isAfter',
      args: [], // will fall back to the current date
      valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
    });
    test({
      validator: 'isAfter',
      args: [undefined], // will fall back to the current date
      valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
    });
    test({
      validator: 'isAfter',
      args: [{ comparisonDate: undefined }], // will fall back to the current date
      valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
    });

    test({
      // Regression: passing `null` as options used to crash with
      // "Cannot read properties of null (reading 'comparisonDate')" because
      // `typeof null === 'object'`. null should fall through to the current
      // date the same way undefined does.
      validator: 'isAfter',
      args: [null],
      valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
      invalid: ['2010-07-02', 'foo'],
    });
  });

  describe('(legacy syntax)', () => {
    it('should validate dates against a start date', () => {
      test({
        validator: 'isAfter',
        args: ['2011-08-03'],
        valid: ['2011-08-04', new Date(2011, 8, 10).toString()],
        invalid: ['2010-07-02', '2011-08-03', new Date(0).toString(), 'foo'],
      });

      test({
        validator: 'isAfter',
        valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
        invalid: ['2010-07-02', new Date(0).toString()],
      });

      test({
        validator: 'isAfter',
        args: ['2011-08-03'],
        valid: ['2015-09-17'],
        invalid: ['invalid date'],
      });

      test({
        validator: 'isAfter',
        args: ['invalid date'],
        invalid: ['invalid date', '2015-09-17'],
      });
    });
  });
});
