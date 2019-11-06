import _ from 'lodash';
import operate from '../logic/operate';
import calculate from '../logic/calculate';

const randomInteger = `${Math.floor(Math.random() * 10)}`;

describe('when buttonName is a number', () => {
  it('returns the state where next is equal to the buttonName if next was "0"', () => {
    const buttonName = randomInteger;
    expect(calculate({ state: { next: '0' }, buttonName }).next).toEqual(
      buttonName,
    );
  });

  it('returns the state where next is appended by the buttonName', () => {
    const buttonName = randomInteger;
    const next = randomInteger * 10 + 1;

    expect(calculate({ state: { next }, buttonName }).next).toEqual(
      next + buttonName,
    );
  });
});

describe('when buttonName is an operation', () => {
  let buttonName;
  const randomOperation = _.sample(['+', '-', 'x', '÷']);

  beforeEach(() => {
    buttonName = randomOperation;
  });

  it('returns the state where operation is the buttonName', () => {
    expect(calculate({ buttonName }).operation).toEqual(buttonName);
  });

  it('returns the state where operation is the buttonName after updating the total and next if there were ', () => {
    const state = {
      total: randomInteger * 1000000,
      next: randomInteger * 1000000,
      operation: randomOperation,
    };

    expect(calculate({ state, buttonName })).toEqual({
      total: operate({
        n1: state.total,
        n2: state.next,
        operation: state.operation,
      }),
      next: 0,
      operation: buttonName,
    });
  });
});

describe('when buttonName is not operator or number', () => {
  it('return a reseted state when buttonName is "AC"', () => {
    expect(calculate({ buttonName: 'AC' })).toEqual({
      total: null,
      next: null,
      operation: null,
    });
  });
});
