import _ from 'lodash';
import process from '../../logic/process';

const randomInteger = () => `${Math.floor(Math.random() * 10)}`;
const randomOperation = _.sample(['+', '-', 'x', '÷']);
const emptyState = { queue: [], next: null, total: null };

describe('when buttonName is a number', () => {
  let buttonNumber;
  beforeEach(() => {
    buttonNumber = randomInteger();
  });

  describe('when operation is null', () => {
    it('sets state.next to the buttonNumber if state.next is null', () => {
      expect(process(emptyState, buttonNumber)).toEqual({
        ...emptyState,
        next: buttonNumber,
      });
    });

    it('appends the buttonNumber to state.next if it is NOT null', () => {
      const next = randomInteger();
      expect(process({ ...emptyState, next }, buttonNumber)).toEqual({
        ...emptyState,
        next: next + buttonNumber,
      });
    });
  });

  describe('when operation is NOT null', () => {
    let operation;
    beforeEach(() => {
      operation = randomOperation;
    });

    it('sets the LHS to the buttonNumber if RHS is null', () => {
      expect(process({ operation }, buttonNumber)).toEqual({
        RHS: buttonNumber,
      });
    });

    it('appends the buttonNumber to RHS if RHS is NOT null and keeps the rest', () => {
      const LHS = randomInteger;
      const RHS = randomInteger;
      expect(process({ LHS, operation, RHS }, buttonNumber)).toEqual({
        LHS,
        operation,
        RHS: RHS + buttonNumber,
      });
    });
  });
});

// describe('when buttonName is an operation', () => {
//   let RHS;
//   let LHS;
//   let operation;
//   let buttonOperation;
//   beforeEach(() => {
//     RHS = randomInteger;
//     LHS = randomInteger;
//     operation = randomOperation;
//     buttonOperation = randomOperation;
//   });

//   describe('when RHS is NOT null', () => {
//     it(`sets the LHS to the result of the state and the operation to
//      the buttonOperation and resets the RHS`, () => {
//       expect(
//         process({ LHS, operation, RHS }, 'x'),
//       ).toEqual({
//         LHS: operate(LHS, RHS, operation),
//         operation: 'x',
//         RHS: null,
//       });
//     });
//   });

//   describe('when RHS is Null', () => {
//     it('sets the operation to the buttonOperation and maintains the LHS', () => {
//       expect(process({ LHS }, buttonOperation)).toEqual({
//         LHS,
//         operation: buttonOperation,
//       });
//     });

//     it('changes the existing operation to the buttonOperation and maintains the LHS', () => {
//       expect(process({ LHS, operation }, buttonOperation)).toEqual({
//         LHS,
//         operation: buttonOperation,
//       });
//     });

//     describe('when LHS and operation are Null', () => {
//       it('sets the operation to the buttonOperation sets the LHS to 0', () => {
//         expect(process({}, buttonOperation)).toEqual({
//           LHS: '0',
//           operation: buttonOperation,
//         });
//       });
//     });
//   });
// });

// describe('when buttonName is not operator or number', () => {
//   describe(' when buttonName is "AC"', () => {
//     it('return a reseted state', () => {
//       expect(process({}, 'AC')).toEqual({
//         LHS: null,
//         RHS: null,
//         operation: null,
//       });

//       expect(process({
//         LHS: randomInteger,
//         operation: randomOperation,
//         RHS: randomInteger,
//       }, 'AC')).toEqual({
//         LHS: null,
//         RHS: null,
//         operation: null,
//       });
//     });
//   });

//   describe('when buttonName is "+/-"', () => {
//     let LHS;
//     let RHS;
//     let operation;

//     beforeEach(() => {
//       LHS = randomInteger;
//       RHS = randomInteger;
//       operation = randomOperation;
//     });

//     describe('if operation is NOT null', () => {
//       it('negates the value of RHS if it exists', () => {
//         expect(process({ LHS, operation, RHS }, '+/-')).toEqual({
//           LHS,
//           operation,
//           RHS: operate(RHS, -1, 'x'),
//         });
//       });

//       it('returns the same state if RHS is null', () => {
//         expect(process({ LHS, operation }, '+/-')).toEqual({
//           LHS,
//           operation,
//         });
//       });
//     });

//     describe('if operation is null', () => {
//       it('negates the value of LHS it exists', () => {
//         expect(process({ LHS }, '+/-')).toEqual({
//           LHS: operate(LHS, -1, 'x'),
//         });
//       });

//       it('returns the same state if LHS is null', () => {
//         expect(process({}, '+/-')).toEqual({});
//       });
//     });
//   });

//   describe('when buttonName is "%"', () => {
//     let LHS;
//     let RHS;
//     let operation;

//     beforeEach(() => {
//       LHS = randomInteger;
//       RHS = randomInteger;
//       operation = randomOperation;
//     });

//     describe('if operation is NOT null', () => {
//       it('divides the value of RHS by 100 if it exists', () => {
//         expect(process({ LHS, operation, RHS }, '%')).toEqual({
//           LHS,
//           operation,
//           RHS: operate(RHS, '100', '÷'),
//         });
//       });

//       it('returns the same state if RHS is null', () => {
//         expect(process({ LHS, operation }, '%')).toEqual({
//           LHS,
//           operation,
//         });
//       });
//     });

//     describe('if operation is null', () => {
//       it('divides the value of LHS by 100 it exists', () => {
//         expect(process({ LHS }, '%')).toEqual({
//           LHS: operate(LHS, '100', '÷'),
//         });
//       });

//       it('returns the same state if LHS is null', () => {
//         expect(process({}, '%')).toEqual({});
//       });
//     });
//   });

//   describe('when buttonName is "."', () => {
//     let LHS;
//     beforeEach(() => {
//       LHS = randomInteger;
//     });

//     describe('when operation is null', () => {
//       it('sets LHS to "0." if LHS was null', () => {
//         expect(process({}, '.')).toEqual({ LHS: '0.' });
//       });

//       it('appends LHS with "."', () => {
//         expect(process({ LHS }, '.')).toEqual({
//           LHS: `${LHS}.`,
//         });
//       });

//       it('keeps LHS if it contains"."', () => {
//         LHS = `${LHS}.`;
//         expect(process({ LHS }, '.')).toEqual({ LHS });
//       });
//     });

//     describe('when operation is NOT null', () => {
//       let RHS;
//       let operation;
//       beforeEach(() => {
//         RHS = randomInteger;
//         operation = randomOperation;
//       });

//       it('sets RHS to "0." if RHS was null', () => {
//         expect(process({ LHS, operation }, '.')).toEqual({
//           LHS,
//           operation,
//           RHS: '0.',
//         });
//       });

//       it('appends RHS with "."', () => {
//         expect(process({ LHS, operation, RHS }, '.')).toEqual({
//           LHS,
//           operation,
//           RHS: `${RHS}.`,
//         });
//       });

//       it('keeps LHS if it contains"."', () => {
//         RHS = `${RHS}.`;
//         expect(process({ LHS, operation, RHS }, '.')).toEqual({
//           LHS,
//           operation,
//           RHS,
//         });
//       });
//     });
//   });

//   describe('when buttonName is "="', () => {
//     let LHS;
//     let operation;
//     let RHS;

//     beforeEach(() => {
//       LHS = randomInteger;
//       operation = randomOperation;
//       RHS = randomInteger;
//     });

//     it('sets LHS to the result of existing operation and restes the rest', () => {
//       expect(process({ LHS, operation, RHS }, '=')).toEqual({
//         LHS: operate(LHS, RHS, operation),
//         operation: null,
//         RHS: null,
//       });
//     });

//     it('keeps the LHS and resets the operation if RHS is null', () => {
//       expect(process({ LHS, operation }, '=')).toEqual({
//         LHS,
//         operation: null,
//       });
//     });

//     it('returns the same state if operation is null', () => {
//       expect(process({ LHS, operation: null }, '=')).toEqual({
//         LHS,
//         operation: null,
//       });
//     });
//   });
// });
