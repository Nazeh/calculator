import operate from '../../logic/operate';

describe('inputs', () => {
  it('returns false if operator is not + - x ÷', () => {
    expect(operate(1, '', 2)).toBeFalsy();
  });

  it('sets first number default to 0', () => {
    expect(operate(null, '+', 2)).toEqual('2');
  });

  it('sets second number default to 0 if operation is + or -', () => {
    expect(operate(2, '+', null)).toEqual('2');
    expect(operate(2, '-', null)).toEqual('2');
  });

  it('sets second number default to 1 if operation is x or ÷', () => {
    expect(operate(3, 'x', null)).toEqual('3');
  });

  it("return division by zero as 'Can't divide by Zero'", () => {
    expect(operate(3, '÷', 0)).toEqual("Can't divide by Zero");
  });
});

describe('integers', () => {
  it('returns a string of the sum of 2 integers', () => {
    expect(operate(1, '+', 2)).toEqual('3');
  });
  it('returns a string of the subtraction of 2 integers', () => {
    expect(operate(1, '-', 2)).toEqual('-1');
  });
  it('returns a string of the product of 2 integers', () => {
    expect(operate(3, 'x', 2)).toEqual('6');
  });
  it('returns a string of the quotient  of 2 integers', () => {
    expect(operate(1, '÷', 2)).toEqual('0.5');
  });
});

describe('floats', () => {
  it('returns a string of the sum of 2 integers', () => {
    expect(operate(1.5, '+', 2)).toEqual('3.5');
  });
  it('returns a string of the subtraction of 2 integers', () => {
    expect(operate(1, '-', 2.2)).toEqual('-1.2');
  });
  it('returns a string of the product of 2 integers', () => {
    expect(operate(3, 'x', 2.2)).toEqual('6.6');
  });
  it('returns a string of the quotient  of 2 integers', () => {
    expect(operate(1, '÷', 2.0)).toEqual('0.5');
  });
});

describe('percentages', () => {
  it('precalculate the percentage of LHS', () => {
    expect(operate('10%', '+', 2)).toEqual('2.1');
  });

  it('precalculate the percentage of RHS', () => {
    expect(operate(2, '+', '10%')).toEqual('2.1');
  });

  it('precalculate the percentage of both LHS and RHS', () => {
    expect(operate('20%', '+', '10%')).toEqual('0.3');
  });
});

describe('Big Numbers', () => {
  it('returns a string of the sum of 2 integers', () => {
    expect(operate(10000000000000, '+', 20000000000000)).toEqual(
      '30000000000000',
    );
  });
  it('returns a string of the subtraction of 2 integers', () => {
    expect(operate(10000000000000, '-', 20000000000000)).toEqual(
      '-10000000000000',
    );
  });
  it('returns a string of the product of 2 integers', () => {
    expect(operate(10000000000000, 'x', 20000000000000)).toEqual('2e+26');
  });
  it('returns a string of the quotient  of 2 integers', () => {
    expect(operate(10000000000000, '÷', 20000000000000)).toEqual('0.5');
  });
});
