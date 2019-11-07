import calculate from '../../logic/calculate';

describe('simple addition', () => {
  let state;
  beforeEach(() => {
    state = { total: null, operation: null, next: null };
  });

  it('returns 1+1 = 2', () => {
    ['1', '+', '1', '='].forEach((buttonName) => {
      state = calculate(state, buttonName);
    });

    expect(state).toEqual({ total: '2', operation: null, next: null });
  });

  it('returns 12+1 = 13', () => {
    ['1', '2', '+', '1', '='].forEach((buttonName) => {
      state = calculate(state, buttonName);
    });

    expect(state).toEqual({ total: '13', operation: null, next: null });
  });
});
