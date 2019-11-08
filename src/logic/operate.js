import Big from 'big.js';

const big100 = Big(100);
const bigZero = Big(0);
const bigOne = Big(1);

const sanitizePercentage = (number) => (/^\d+%$/.test(number)
  ? Big(number.slice(0, -1)).div(big100) : Big(number));

const sanitizeRHS = (RHS, operation) => {
  if (`${RHS}` !== 'null') return sanitizePercentage(RHS);
  return operation === '÷' || operation === 'x' ? bigOne : bigZero;
};

const operate = (LHS, operation, RHS) => {
  LHS = LHS ? sanitizePercentage(LHS) : bigZero;
  RHS = sanitizeRHS(RHS, operation);

  switch (operation) {
    case '+':
      return LHS.plus(RHS).toString();
    case '-':
      return LHS.minus(RHS).toString();
    case 'x':
      return LHS.times(RHS).toString();
    case '÷':
      if (RHS.toString() === '0') return "Can't divide by Zero";
      return LHS.div(RHS).toString();
    default:
      return false;
  }
};

export default operate;
