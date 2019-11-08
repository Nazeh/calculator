import operate from './operate';

const isNumber = (str) => /^[0-9]$/.test(str);
const isOperation = (str) => /^['+','\-','x','÷']$/.test(str);
const tryAddDot = (str) => (str.includes('.') ? str : `${str}.`);

const calculate = (
  state = { LHS: null, operation: null, RHS: null },
  buttonName,
) => {
  if (isNumber(buttonName)) {
    if (state.operation) {
      return { ...state, RHS: `${state.RHS || ''}${buttonName}` };
    }
    return { LHS: `${state.LHS || ''}${buttonName}` };
  }

  if (isOperation(buttonName)) {
    if (state.RHS) {
      return {
        LHS: operate(state.LHS, state.RHS, state.operation),
        operation: buttonName,
        RHS: null,
      };
    }
    return { ...state, LHS: state.LHS || '0', operation: buttonName };
  }

  switch (buttonName) {
    case 'AC':
      return { LHS: null, RHS: null, operation: null };
    case '+/-':
      if (state.operation) {
        return state.RHS
          ? { ...state, RHS: operate(state.RHS, -1, 'x') }
          : { ...state };
      }
      return state.LHS
        ? { ...state, LHS: operate(state.LHS, -1, 'x') }
        : { ...state };
    case '%':
      if (state.operation) {
        return state.RHS
          ? { ...state, RHS: operate(state.RHS, '100', '÷') }
          : { ...state };
      }
      return state.LHS
        ? { ...state, LHS: operate(state.LHS, '100', '÷') }
        : { ...state };
    case '.':
      if (state.operation) {
        return { ...state, RHS: state.RHS ? tryAddDot(state.RHS) : '0.' };
      }
      return { LHS: state.LHS ? tryAddDot(state.LHS) : '0.' };
    case '=':
      if (state.RHS) {
        return {
          LHS: operate(state.LHS, state.RHS, state.operation),
          operation: null,
          RHS: null,
        };
      }
      if (state.operation) {
        return {
          ...state,
          LHS: operate(state.LHS, state.RHS, state.operation),
          operation: null,
        };
      }
      return { ...state };
    default:
  }

  return false;
};

export default calculate;
