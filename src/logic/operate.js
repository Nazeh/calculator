import Big from 'big.js';

const operate = ({ n1, n2, operation }) => {
  const firstNumber = Big(n1 || '0');
  const defaultN2 = ['÷', 'x'].includes(operation) ? '1' : '0';
  const secondNumber = Big(n2 === 0 ? '0' : (n2 || defaultN2));

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
    case '%':
      return firstNumber.div(100).toString();
    default:
      return false;
  }
};

export default operate;
