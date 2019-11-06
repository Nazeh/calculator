import operate from './operate';

const isNumber = (str) => /^[0-9]$/.test(str);
const isOperation = (str) => /^['+','\-','x','÷','%']$/.test(str);

const calculate = ({ state = {}, buttonName }) => {
  if (isNumber(buttonName)) {
    if (state.next === '0') return { ...state, next: buttonName };
    return { ...state, next: `${state.next || ''}${buttonName}` };
  }

  if (isOperation(buttonName)) {
    if (state.operation) {
      const total = operate({
        n1: state.total,
        n2: state.next,
        operation: state.operation,
      });

      return { total, next: 0, operation: buttonName };
    }
    return { ...state, operation: buttonName };
  }

  switch (buttonName) {
    case 'AC':
      return { total: null, next: null, operation: null };
    case '+/-':
      return { total: null, next: null, operation: null };
    case '.':
      return { total: null, next: null, operation: null };
    case '%':
      return { total: null, next: null, operation: null };
    case '=':
      return { total: null, next: null, operation: null };
    default:
  }

  return false;
};

export default calculate;
