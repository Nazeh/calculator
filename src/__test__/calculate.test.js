import _ from 'lodash';
import operate from '../logic/operate';
import calculate from '../logic/calculate';

const randomInteger = `${Math.floor(Math.random() * 10)}`;
const randomOperation = _.sample(['+', '-', 'x', '÷']);

describe('when buttonName is a number', () => {
  let buttonNumber;
  beforeEach(() => {
    buttonNumber = randomInteger;
  });

  describe('when operation is null', () => {
    it('sets the total to the buttonNumber if total is null', () => {
      expect(calculate({}, buttonNumber)).toMatchObject({
        total: buttonNumber,
      });
    });

    it('appends the buttonNumber to total if total is NOT null', () => {
      const total = randomInteger;
      expect(calculate({ total }, buttonNumber)).toMatchObject({
        total: total + buttonNumber,
      });
    });
  });

  describe('when operation is NOT null', () => {
    let operation;
    beforeEach(() => {
      operation = randomOperation;
    });

    it('sets the total to the buttonNumber if next is null', () => {
      expect(calculate({ operation }, buttonNumber)).toMatchObject({
        next: buttonNumber,
      });
    });

    it('appends the buttonNumber to next if next is NOT null', () => {
      const next = randomInteger;
      expect(calculate({ next, operation }, buttonNumber)).toMatchObject({
        next: next + buttonNumber,
      });
    });
  });
});

describe('when buttonName is an operation', () => {
  let next;
  let total;
  let operation;
  let buttonOperation;
  beforeEach(() => {
    next = randomInteger;
    total = randomInteger;
    operation = randomOperation;
    buttonOperation = randomOperation;
  });

  describe('when next is NOT null', () => {
    it(`sets the total to the result of the state and the operation to
     the buttonOperation and resets the next`, () => {
      expect(
        calculate({ total, operation, next }, buttonOperation),
      ).toMatchObject({
        total: operate(total, next, operation),
        operation: buttonOperation,
        next: null,
      });
    });
  });

  describe('when next is Null', () => {
    it('sets the operation to the buttonOperation and maintains the total', () => {
      expect(calculate({ total }, buttonOperation)).toMatchObject({
        total,
        operation: buttonOperation,
      });
    });

    it('changes the existing operation to the buttonOperation and maintains the total', () => {
      expect(calculate({ total, operation }, buttonOperation)).toMatchObject({
        total,
        operation: buttonOperation,
      });
    });

    describe('when total and operation are Null', () => {
      it('sets the operation to the buttonOperation sets the total to 0', () => {
        expect(calculate({}, buttonOperation)).toMatchObject({
          total: '0',
          operation: buttonOperation,
        });
      });
    });
  });
});

describe('when buttonName is not operator or number', () => {
  describe(' when buttonName is "AC"', () => {
    it('return a reseted state', () => {
      expect(calculate({}, 'AC')).toMatchObject({
        total: null,
        next: null,
        operation: null,
      });

      expect(calculate({
        total: randomInteger,
        operation: randomOperation,
        next: randomInteger,
      }, 'AC')).toMatchObject({
        total: null,
        next: null,
        operation: null,
      });
    });
  });

  describe('when buttonName is "+/-"', () => {
    let total;
    let next;
    let operation;

    beforeEach(() => {
      total = randomInteger;
      next = randomInteger;
      operation = randomOperation;
    });

    describe('if operation is NOT null', () => {
      it('negates the value of next if it exists', () => {
        expect(calculate({ total, operation, next }, '+/-')).toMatchObject({
          total,
          operation,
          next: operate(next, -1, 'x'),
        });
      });

      it('returns the same state if next is null', () => {
        expect(calculate({ total, operation }, '+/-')).toEqual({
          total,
          operation,
        });
      });
    });

    describe('if operation is null', () => {
      it('negates the value of total it exists', () => {
        expect(calculate({ total }, '+/-')).toMatchObject({
          total: operate(total, -1, 'x'),
        });
      });

      it('returns the same state if total is null', () => {
        expect(calculate({}, '+/-')).toEqual({});
      });
    });
  });

  describe('when buttonName is "."', () => {
    describe('when operation is null', () => {
      let total;
      beforeEach(() => {
        total = randomInteger;
      });

      it('sets total to "0." if total was null', () => {
        expect(calculate({}, '.')).toMatchObject({ total: '0.' });
      });

      it('appends total with "."', () => {
        expect(calculate({ total }, '.')).toMatchObject({
          total: `${total}.`,
        });
      });

      it('keeps total if it contains"."', () => {
        total = `${total}.`;
        expect(calculate({ total }, '.')).toMatchObject({ total });
      });
    });

    describe('when operation is NOT null', () => {
      let next;
      let operation;
      beforeEach(() => {
        next = randomInteger;
        operation = randomOperation;
      });

      it('sets total to "0." if total was null', () => {
        expect(calculate({ operation }, '.')).toMatchObject({ next: '0.' });
      });

      it('appends total with "."', () => {
        expect(calculate({ next, operation }, '.')).toMatchObject({
          next: `${next}.`,
        });
      });

      it('keeps total if it contains"."', () => {
        next = `${next}.`;
        expect(calculate({ next, operation }, '.')).toMatchObject({ next });
      });
    });
  });

  describe('when buttonName is "="', () => {
    let total;
    let operation;
    let next;

    beforeEach(() => {
      total = randomInteger;
      operation = randomOperation;
      next = randomInteger;
    });

    it('sets total to the result of existing operation and restes the rest', () => {
      expect(calculate({ total, operation, next }, '=')).toMatchObject({
        total: operate(total, next, operation),
        operation: null,
        next: null,
      });
    });

    it('keeps the total and resets the operation if next is null', () => {
      expect(calculate({ total, operation }, '=')).toMatchObject({
        total,
        operation: null,
      });
    });

    it('returns the same state if operation is null', () => {
      expect(calculate({ total, operation: null }, '=')).toMatchObject({
        total,
        operation: null,
      });
    });
  });
});
