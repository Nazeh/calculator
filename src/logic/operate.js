import Big from 'big.js';

const operate = (LHS, operation, RHS) => {
  const firstNumber = Big(LHS || '0');
  const defaultRHS = ['÷', 'x'].includes(operation) ? '1' : '0';
  const secondNumber = Big(RHS === 0 ? '0' : (RHS || defaultRHS));

  switch (operation) {
    case '+':
      return firstNumber.plus(secondNumber).toString();
    case '-':
      return firstNumber.minus(secondNumber).toString();
    case 'x':
      return firstNumber.times(secondNumber).toString();
    case '÷':
      if (secondNumber.toString() === '0') return "Can't divide by Zero";
      return firstNumber.div(secondNumber).toString();
    default:
      return false;
  }
};

export default operate;
