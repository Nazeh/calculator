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

      expect(state).toMatchObject({ total: '2' });
    });

    it('returns 12+1 = 13', () => {
      ['1', '2', '+', '1', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '13' });
    });
  });

  describe('simple subtraction', () => {
    it('returns 10 - 2 = 8', () => {
      ['1', '0', '-', '2', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '8' });
    });
  });

  describe('simple multiplications', () => {
    it('returns 10 x 2 = 20', () => {
      ['1', '0', 'x', '2', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '20' });
    });
  });

  describe('simple division', () => {
    it('returns 10 ÷ 2 = 5', () => {
      ['1', '0', '÷', '2', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '5' });
    });
  });

  describe('simple percentage', () => {
    it('returns 10 % >> 0.1', () => {
      ['1', '0', '%'].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '0.1' });
    });

    it('returns 5 + 10 % >> 0.1', () => {
      ['5', '+', '1', '0', '%'].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ next: '0.1' });
    });
  });

  describe('dot "."', () => {
    it('returns . >> 0.', () => {
      ['.'].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '0.' });
    });

    it('returns 10 . >> 10.', () => {
      ['1', '0', '.'].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '10.' });
    });

    it('returns 10 + 5 .  >> 5.2', () => {
      ['1', '0', '+', '5', '.', '2'].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '10', operation: '+', next: '5.2' });
    });
  });

  describe('complicated serial of buttons', () => {
    it('returns 10 + 2 x 3 = 60', () => {
      ['1', '0', '+', '2', 'x', '3', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '36' });
    });

    it('returns 10 + 2 x 3 = 60', () => {
      ['1', '0', 'x', '2', '+', '3', '='].forEach((buttonName) => {
        state = calculate(state, buttonName);
      });

      expect(state).toMatchObject({ total: '23' });
    });
  });
});
