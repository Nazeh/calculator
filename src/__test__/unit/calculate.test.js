import _ from 'lodash';
import operate from '../../logic/operate';
import calculate from '../../logic/calculate';

const randomInteger = `${Math.floor(Math.random() * 10)}`;
const randomOperation = _.sample(['+', '-', 'x', '÷']);

describe('when buttonName is a number', () => {
  let buttonNumber;
  beforeEach(() => {
    buttonNumber = randomInteger;
  });

  describe('when operation is null', () => {
    it('sets the LHS to the buttonNumber if LHS is null', () => {
      expect(calculate({}, buttonNumber)).toMatchObject({
        LHS: buttonNumber,
      });
    });

    it('appends the buttonNumber to LHS if LHS is NOT null', () => {
      const LHS = randomInteger;
      expect(calculate({ LHS }, buttonNumber)).toMatchObject({
        LHS: LHS + buttonNumber,
      });
    });
  });

  describe('when operation is NOT null', () => {
    let operation;
    beforeEach(() => {
      operation = randomOperation;
    });

    it('sets the LHS to the buttonNumber if RHS is null', () => {
      expect(calculate({ operation }, buttonNumber)).toMatchObject({
        RHS: buttonNumber,
      });
    });

    it('appends the buttonNumber to RHS if RHS is NOT null and keeps the rest', () => {
      const LHS = randomInteger;
      const RHS = randomInteger;
      expect(calculate({ LHS, operation, RHS }, buttonNumber)).toMatchObject({
        LHS,
        operation,
        RHS: RHS + buttonNumber,
      });
    });
  });
});

describe('when buttonName is an operation', () => {
  let RHS;
  let LHS;
  let operation;
  let buttonOperation;
  beforeEach(() => {
    RHS = randomInteger;
    LHS = randomInteger;
    operation = randomOperation;
    buttonOperation = randomOperation;
  });

  describe('when RHS is NOT null', () => {
    it(`sets the LHS to the result of the state and the operation to
     the buttonOperation and resets the RHS`, () => {
      expect(
        calculate({ LHS, operation, RHS }, 'x'),
      ).toMatchObject({
        LHS: operate(LHS, RHS, operation),
        operation: 'x',
        RHS: null,
      });
    });
  });

  describe('when RHS is Null', () => {
    it('sets the operation to the buttonOperation and maintains the LHS', () => {
      expect(calculate({ LHS }, buttonOperation)).toMatchObject({
        LHS,
        operation: buttonOperation,
      });
    });

    it('changes the existing operation to the buttonOperation and maintains the LHS', () => {
      expect(calculate({ LHS, operation }, buttonOperation)).toMatchObject({
        LHS,
        operation: buttonOperation,
      });
    });

    describe('when LHS and operation are Null', () => {
      it('sets the operation to the buttonOperation sets the LHS to 0', () => {
        expect(calculate({}, buttonOperation)).toMatchObject({
          LHS: '0',
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
        LHS: null,
        RHS: null,
        operation: null,
      });

      expect(calculate({
        LHS: randomInteger,
        operation: randomOperation,
        RHS: randomInteger,
      }, 'AC')).toMatchObject({
        LHS: null,
        RHS: null,
        operation: null,
      });
    });
  });

  describe('when buttonName is "+/-"', () => {
    let LHS;
    let RHS;
    let operation;

    beforeEach(() => {
      LHS = randomInteger;
      RHS = randomInteger;
      operation = randomOperation;
    });

    describe('if operation is NOT null', () => {
      it('negates the value of RHS if it exists', () => {
        expect(calculate({ LHS, operation, RHS }, '+/-')).toMatchObject({
          LHS,
          operation,
          RHS: operate(RHS, -1, 'x'),
        });
      });

      it('returns the same state if RHS is null', () => {
        expect(calculate({ LHS, operation }, '+/-')).toEqual({
          LHS,
          operation,
        });
      });
    });

    describe('if operation is null', () => {
      it('negates the value of LHS it exists', () => {
        expect(calculate({ LHS }, '+/-')).toMatchObject({
          LHS: operate(LHS, -1, 'x'),
        });
      });

      it('returns the same state if LHS is null', () => {
        expect(calculate({}, '+/-')).toEqual({});
      });
    });
  });

  describe('when buttonName is "%"', () => {
    let LHS;
    let RHS;
    let operation;

    beforeEach(() => {
      LHS = randomInteger;
      RHS = randomInteger;
      operation = randomOperation;
    });

    describe('if operation is NOT null', () => {
      it('divides the value of RHS by 100 if it exists', () => {
        expect(calculate({ LHS, operation, RHS }, '%')).toMatchObject({
          LHS,
          operation,
          RHS: operate(RHS, '100', '÷'),
        });
      });

      it('returns the same state if RHS is null', () => {
        expect(calculate({ LHS, operation }, '%')).toEqual({
          LHS,
          operation,
        });
      });
    });

    describe('if operation is null', () => {
      it('divides the value of LHS by 100 it exists', () => {
        expect(calculate({ LHS }, '%')).toMatchObject({
          LHS: operate(LHS, '100', '÷'),
        });
      });

      it('returns the same state if LHS is null', () => {
        expect(calculate({}, '%')).toEqual({});
      });
    });
  });

  describe('when buttonName is "."', () => {
    let LHS;
    beforeEach(() => {
      LHS = randomInteger;
    });

    describe('when operation is null', () => {
      it('sets LHS to "0." if LHS was null', () => {
        expect(calculate({}, '.')).toMatchObject({ LHS: '0.' });
      });

      it('appends LHS with "."', () => {
        expect(calculate({ LHS }, '.')).toMatchObject({
          LHS: `${LHS}.`,
        });
      });

      it('keeps LHS if it contains"."', () => {
        LHS = `${LHS}.`;
        expect(calculate({ LHS }, '.')).toMatchObject({ LHS });
      });
    });

    describe('when operation is NOT null', () => {
      let RHS;
      let operation;
      beforeEach(() => {
        RHS = randomInteger;
        operation = randomOperation;
      });

      it('sets RHS to "0." if RHS was null', () => {
        expect(calculate({ LHS, operation }, '.')).toMatchObject({
          LHS,
          operation,
          RHS: '0.',
        });
      });

      it('appends RHS with "."', () => {
        expect(calculate({ LHS, operation, RHS }, '.')).toMatchObject({
          LHS,
          operation,
          RHS: `${RHS}.`,
        });
      });

      it('keeps LHS if it contains"."', () => {
        RHS = `${RHS}.`;
        expect(calculate({ LHS, operation, RHS }, '.')).toMatchObject({
          LHS,
          operation,
          RHS,
        });
      });
    });
  });

  describe('when buttonName is "="', () => {
    let LHS;
    let operation;
    let RHS;

    beforeEach(() => {
      LHS = randomInteger;
      operation = randomOperation;
      RHS = randomInteger;
    });

    it('sets LHS to the result of existing operation and restes the rest', () => {
      expect(calculate({ LHS, operation, RHS }, '=')).toMatchObject({
        LHS: operate(LHS, RHS, operation),
        operation: null,
        RHS: null,
      });
    });

    it('keeps the LHS and resets the operation if RHS is null', () => {
      expect(calculate({ LHS, operation }, '=')).toMatchObject({
        LHS,
        operation: null,
      });
    });

    it('returns the same state if operation is null', () => {
      expect(calculate({ LHS, operation: null }, '=')).toMatchObject({
        LHS,
        operation: null,
      });
    });
  });
});
