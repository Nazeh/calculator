import calculate from '../../logic/calculate';

describe('', () => {
  let state;
  beforeEach(() => {
    state = { total: null, operation: null, next: null };
  });

  describe('simple addition', () => {
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

  describe('simple subtraction', () => {
    it('returns 10 - 2 = 8', () => {
      ['1', '0', '-', '2', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toEqual({ total: '8', operation: null, next: null });
    });
  });

  describe('simple multiplications', () => {
    it('returns 10 x 2 = 20', () => {
      ['1', '0', 'x', '2', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toEqual({ total: '20', operation: null, next: null });
    });
  });

  describe('simple division', () => {
    it('returns 10 ÷ 2 = 5', () => {
      ['1', '0', '÷', '2', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toEqual({ total: '5', operation: null, next: null });
    });
  });

  describe('complicated serial of buttons', () => {
    it('returns 10 + 2 x 3 = 60', () => {
      ['1', '0', '+', '2', 'x', '3', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toEqual({ total: '36', operation: null, next: null });
    });
  });
});
