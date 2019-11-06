import operate from './operate';

const isNumber = (str) => /^[0-9]$/.test(str);
const isOperation = (str) => /^['+','\-','x','÷','%']$/.test(str);

const calculate = (state = {}, buttonName) => {
  if (isNumber(buttonName)) {
    if (state.operation) return { ...state, total: state.next, next: buttonName };
    if (state.next === '0') return { ...state, next: buttonName };
    return { ...state, next: `${state.next || ''}${buttonName}` };
  }

  if (isOperation(buttonName)) {
    if (state.operation) {
      const total = operate(state.total, state.next, state.operation);
      return { total, next: '0', operation: buttonName };
    }
    return { ...state, operation: buttonName };
  }

  switch (buttonName) {
    case 'AC':
      return { total: null, next: '0', operation: null };
    case '+/-':
      if (state.next) return { ...state, next: operate(state.next, -1, 'x') };
      return { ...state, total: operate(state.total, -1, 'x') };
    case '.':
      if (!state.next.includes('.')) {
        return { ...state, next: `${state.next}.` };
      }
      return { ...state };
    case '=':
      if (state.operation) {
        return {
          total: operate(state.total, state.next, state.operation),
          next: '0',
          operation: null,
        };
      }
      return { ...state };
    default:
  }

  return false;
};

export default calculate;
