import _ from 'lodash';
import operate from '../logic/operate';
import calculate from '../logic/calculate';

const randomInteger = `${Math.floor(Math.random() * 10)}`;
const randomOperation = _.sample(['+', '-', 'x', '÷']);

describe('when buttonName is a number', () => {
  it('returns the state where next is equal to the buttonName if next was "0"', () => {
    const buttonName = randomInteger;
    expect(calculate({ next: '0' }, buttonName).next).toEqual(buttonName);
  });

  it('returns the state where next is appended by the buttonName', () => {
    const buttonName = randomInteger;
    const next = randomInteger * 10 + 1;

    expect(calculate({ next }, buttonName).next).toEqual(next + buttonName);
  });

  it('returns the state where total is next and next is buttonName if there is operation', () => {
    const buttonName = randomInteger;
    const next = randomInteger * 10 + 1;
    const operation = randomOperation;

    expect(calculate({ next, operation }, buttonName)).toEqual({
      total: next,
      next: buttonName,
      operation,
    });
  });
});

describe('when buttonName is an operation', () => {
  let buttonName;

  beforeEach(() => {
    buttonName = randomOperation;
  });

  it('returns the state where operation is the buttonName', () => {
    expect(calculate({}, buttonName).operation).toEqual(buttonName);
  });

  it(`returns the state where operation is the buttonName 
      after updating the total and next if there were old operation`, () => {
    const state = {
      total: randomInteger * 1000000,
      next: randomInteger * 1000000,
      operation: randomOperation,
    };

    expect(calculate(state, buttonName)).toEqual({
      total: operate(state.total, state.next, state.operation),
      next: '0',
      operation: buttonName,
    });
  });
});

describe('when buttonName is not operator or number', () => {
  it('return a reseted state when buttonName is "AC"', () => {
    expect(calculate({}, 'AC')).toEqual({
      total: null,
      next: '0',
      operation: null,
    });
  });

  describe('when buttonName is "+/-"', () => {
    let number;
    let operation;

    beforeEach(() => {
      number = randomInteger;
      operation = randomOperation;
    });

    it('negates the value of next if it exists', () => {
      expect(
        calculate({ total: null, next: number, operation }, '+/-'),
      ).toEqual({ total: null, next: operate(number, -1, 'x'), operation });
    });

    it('negates the value of total if next doesnt exist', () => {
      expect(
        calculate({ total: number, next: null, operation }, '+/-'),
      ).toEqual({ next: null, total: operate(number, -1, 'x'), operation });
    });
  });

  describe('when buttonName is "."', () => {
    it('returns state with "." appended to next', () => {
      const next = randomInteger;
      expect(calculate({ next }, '.').next).toEqual(`${next}.`);
    });

    it('returns state with the same next if it next containes"."', () => {
      const next = `${randomInteger}.`;
      expect(calculate({ next }, '.').next).toEqual(next);
    });
  });

  describe('when buttonName is "="', () => {
    it('returns state with the calculated total', () => {
      const state = {
        total: randomInteger,
        next: randomInteger,
        operation: randomOperation,
      };

      expect(calculate(state, '=')).toEqual({
        total: operate(state.total, state.next, state.operation),
        next: '0',
        operation: null,
      });
    });

    it('returns unchanged state if there is no operation', () => {
      const state = {
        total: randomInteger,
        next: randomInteger,
        operation: null,
      };

      expect(calculate(state, '=')).toEqual(state);
    });
  });
});
