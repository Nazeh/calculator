import calculate from './calculate';

const isNumber = (str) => /^[0-9]$/.test(str);
const isOperation = (str) => /^['+','\-','x','÷']$/.test(str);
// const tryAddDot = (str) => (str.includes('.') ? str : `${str}.`);

const process = (
  state = { queue: [], next: null, total: null },
  buttonName,
) => {
  if (isNumber(buttonName)) {
    let { next, queue } = state;
    if (!next) return { ...state, next: buttonName, total: buttonName };
    if (isOperation(next)) {
      queue = [...queue, next];
      next = buttonName;
    } else {
      next += buttonName;
    }

    return { queue, next, total: calculate([...queue, next]) };
  }

  if (isOperation(buttonName)) {
    if (state.total === 'Cannot divide by zero‬') {
      return { queue: [], next: null, total: null };
    }
    if (!state.next) return { queue: ['0'], next: buttonName, total: '0' };
    if (isOperation(state.next)) return { ...state, next: buttonName };

    return {
      queue: [...state.queue, state.next],
      next: buttonName,
      total: calculate([...state.queue, state.next]),
    };
  }

  // switch (buttonName) {
  //   case 'AC':
  //     return { total: null, next: null, operation: null };
  //   case '+/-':
  //     if (state.operation) {
  //       return state.next
  //         ? { ...state, next: operate(state.next, -1, 'x') }
  //         : { ...state };
  //     }
  //     return state.total
  //       ? { ...state, total: operate(state.total, -1, 'x') }
  //       : { ...state };
  //   case '%':
  //     if (state.operation) {
  //       return state.next
  //         ? { ...state, next: operate(state.next, '100', '÷') }
  //         : { ...state };
  //     }
  //     return state.total
  //       ? { ...state, total: operate(state.total, '100', '÷') }
  //       : { ...state };
  //   case '.':
  //     if (state.operation) {
  //       return { ...state, next: state.next ? tryAddDot(state.next) : '0.' };
  //     }
  //     return { total: state.total ? tryAddDot(state.total) : '0.' };
  //   case '=':
  //     if (state.next) {
  //       return {
  //         total: operate(state.total, state.next, state.operation),
  //         operation: null,
  //         next: null,
  //       };
  //     }
  //     if (state.operation) {
  //       return {
  //         ...state,
  //         total: operate(state.total, state.next, state.operation),
  //         operation: null,
  //       };
  //     }
  //     return { ...state };
  //   default:
  // }

  return false;
};

export default process;
