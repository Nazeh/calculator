import _ from 'lodash';
import calculate from '../../logic/calculate';

describe('when stack length is less than complete stack of operations', () => {
  it('returns the first element in stack if stack length === 1', () => {
    expect(calculate(['1'])).toEqual('1');
  });

  it('returns the first element in stack if stack length < 3', () => {
    expect(calculate(['1', 'x'])).toEqual('1');
  });

  it('returns the result of the stack excluding last element if length is even', () => {
    expect(calculate(['1', '+', '1', '+'])).toEqual('2');
  });
});

describe('simple addition', () => {
  it('returns 1+1 = 2', () => {
    expect(calculate(['1', '+', '1', '='])).toEqual('2');
  });

  it('returns 12+1 = 13', () => {
    expect(calculate(['12', '+', '1', '='])).toEqual('13');
  });
});

describe('simple subtraction', () => {
  it('returns 10 - 2 = 8', () => {
    expect(calculate(['10', '-', '2', '='])).toEqual('8');
  });
});

describe('simple multiplications', () => {
  it('returns 10 x 2 = 20', () => {
    expect(calculate(['10', 'x', '2', '='])).toEqual('20');
  });
});

describe('simple division', () => {
  it('returns 10 ÷ 2 = 5', () => {
    expect(calculate(['10', '÷', '2', '='])).toEqual('5');
  });
});

describe('simple percentage', () => {
  it('returns 10% >> 0.1', () => {
    expect(calculate(['10%'])).toEqual('0.1');
  });

  it('returns 5 + 10% >> 0.1', () => {
    expect(calculate(['5', '+', '10%'])).toEqual('5.1');
  });
});

describe('dot "."', () => {
  it('returns 10. >> 10', () => {
    expect(calculate(['10.'])).toEqual('10');
  });

  it('returns 10 + 5.  = 15.', () => {
    expect(calculate(['10', '+', '5.'])).toEqual('15');
  });

  it('returns 10 + 5.2  = 15.2', () => {
    expect(calculate(['10', '+', '5.2'])).toEqual('15.2');
  });
});

describe('complicated serial of buttons', () => {
  it('returns 10 + 2 x 3 = 36', () => {
    expect(calculate(['10', '+', '2', 'x', '3', '+'])).toEqual('36');
  });

  it('returns 10 x 2 + 3 = 23', () => {
    expect(calculate(['10', 'x', '2', '+', '3', '='])).toEqual('23');
  });

  it('can calculate up to 100 operations', () => {
    expect(
      calculate(
        _.flatten(_.range(100).map(() => ['1', 'x'])),
      ),
    ).toEqual('1');
  });
});
