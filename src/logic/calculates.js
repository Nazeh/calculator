import operate from './operate';

const isNumber = (str) => /^[0-9]$/.test(str);
const isOperation = (str) => /^['+','\-','x','÷']$/.test(str);
const tryAddDot = (str) => (str.includes('.') ? str : `${str}.`);

const calculate = (
  state = { total: null, operation: null, next: null },
  buttonName,
) => {
  if (isNumber(buttonName)) {
    if (state.operation) {
      return { ...state, next: `${state.next || ''}${buttonName}` };
    }
    return { total: `${state.total || ''}${buttonName}` };
  }

  if (isOperation(buttonName)) {
    if (state.next) {
      return {
        total: operate(state.total, state.next, state.operation),
        operation: buttonName,
        next: null,
      };
    }
    return { ...state, total: state.total || '0', operation: buttonName };
  }

  switch (buttonName) {
    case 'AC':
      return { total: null, next: null, operation: null };
    case '+/-':
      if (state.operation) {
        return state.next
          ? { ...state, next: operate(state.next, -1, 'x') }
          : { ...state };
      }
      return state.total
        ? { ...state, total: operate(state.total, -1, 'x') }
        : { ...state };
    case '%':
      if (state.operation) {
        return state.next
          ? { ...state, next: operate(state.next, '100', '÷') }
          : { ...state };
      }
      return state.total
        ? { ...state, total: operate(state.total, '100', '÷') }
        : { ...state };
    case '.':
      if (state.operation) {
        return { ...state, next: state.next ? tryAddDot(state.next) : '0.' };
      }
      return { total: state.total ? tryAddDot(state.total) : '0.' };
    case '=':
      if (state.next) {
        return {
          total: operate(state.total, state.next, state.operation),
          operation: null,
          next: null,
        };
      }
      if (state.operation) {
        return {
          ...state,
          total: operate(state.total, state.next, state.operation),
          operation: null,
        };
      }
      return { ...state };
    default:
  }

  return false;
};

export default calculate;
