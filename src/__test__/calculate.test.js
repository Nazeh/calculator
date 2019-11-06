import calculate from '../logic/calculate';

describe('when buttonName is not operator or number', () => {
  it('return a reseted state when buttonName is "AC"', () => {
    expect(calculate({ buttonName: 'AC' })).toEqual({
      total: null, next: null, operation: null,
    });
  });
});
