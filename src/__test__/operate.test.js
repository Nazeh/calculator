import operate from '../logic/operate';

describe('inputs', () => {
  it('returns false if operator is not + - x ÷', () => {
    expect(operate({ n1: 1, n2: 2, operation: '' })).toBeFalsy();
  });

  it('sets first number default to 0', () => {
    expect(operate({ n1: null, n2: 2, operation: '+' })).toEqual('2');
  });

  it('sets second number default to 0 if operation is + or -', () => {
    expect(operate({ n1: 2, n2: null, operation: '+' })).toEqual('2');
  });

  it('sets second number default to 1 if operation is x or ÷', () => {
    expect(operate({ n1: 3, n2: null, operation: 'x' })).toEqual('3');
  });

  it("return division by zero as 'Can't divide by Zero'", () => {
    expect(operate({ n1: 3, n2: 0, operation: '÷' })).toEqual("Can't divide by Zero");
  });
});

describe('integers', () => {
  it('returns a string of the sum of 2 integers', () => {
    expect(operate({ n1: 1, n2: 2, operation: '+' })).toEqual('3');
  });
  it('returns a string of the subtraction of 2 integers', () => {
    expect(operate({ n1: 1, n2: 2, operation: '-' })).toEqual('-1');
  });
  it('returns a string of the product of 2 integers', () => {
    expect(operate({ n1: 3, n2: 2, operation: 'x' })).toEqual('6');
  });
  it('returns a string of the quotient  of 2 integers', () => {
    expect(operate({ n1: 1, n2: 2, operation: '÷' })).toEqual('0.5');
  });
});

describe('floats', () => {
  it('returns a string of the sum of 2 integers', () => {
    expect(operate({ n1: 1.5, n2: 2, operation: '+' })).toEqual('3.5');
  });
  it('returns a string of the subtraction of 2 integers', () => {
    expect(operate({ n1: 1, n2: 2.2, operation: '-' })).toEqual('-1.2');
  });
  it('returns a string of the product of 2 integers', () => {
    expect(operate({ n1: 3, n2: 2.2, operation: 'x' })).toEqual('6.6');
  });
  it('returns a string of the quotient  of 2 integers', () => {
    expect(operate({ n1: 1, n2: 2.0, operation: '÷' })).toEqual('0.5');
  });
});

describe('Big Numbers', () => {
  it('returns a string of the sum of 2 integers', () => {
    expect(
      operate({ n1: 10000000000000, n2: 20000000000000, operation: '+' }),
    ).toEqual('30000000000000');
  });
  it('returns a string of the subtraction of 2 integers', () => {
    expect(
      operate({ n1: 10000000000000, n2: 20000000000000, operation: '-' }),
    ).toEqual('-10000000000000');
  });
  it('returns a string of the product of 2 integers', () => {
    expect(
      operate({ n1: 10000000000000, n2: 20000000000000, operation: 'x' }),
    ).toEqual('2e+26');
  });
  it('returns a string of the quotient  of 2 integers', () => {
    expect(
      operate({ n1: 10000000000000, n2: 20000000000000, operation: '÷' }),
    ).toEqual('0.5');
  });
});
