import calculate from './calculate';

const isNumber = (str) => /^[0-9]$/.test(str);
const isOperation = (str) => /^['+','\-','x','÷']$/.test(str);
const tryAddDot = (str) => (str.includes('.') ? str : `${str}.`);

const process = (
  state = { queue: [], next: null, total: null },
  buttonName,
) => {
  if (isNumber(buttonName)) {
    let { next, queue } = state;
    if (!next) return { queue: [], next: buttonName, total: buttonName };
    if (isOperation(next)) {
      queue = [...queue, next];
      next = buttonName;
    } else {
      next += buttonName;
    }

    return {
      queue,
      next,
      total: calculate([...queue, next]) || 'Cannot divide by zero',
    };
  }

  if (isOperation(buttonName)) {
    if (!state.next) {
      return {
        queue: state.queue.length > 0 ? state.queue : ['0'],
        next: buttonName,
        total: '0',
      };
    }
    if (isOperation(state.next)) return { ...state, next: buttonName };

    return {
      queue: [...state.queue, state.next],
      next: buttonName,
      total: calculate([...state.queue, state.next]) || 'Cannot divide by zero',
    };
  }

  switch (buttonName) {
    case 'AC':
      return { queue: [], next: null, total: null };
    case '=':
      return state.total
        ? { queue: [state.total], next: null, total: null }
        : { ...state };
    case '.':
      if (!state.next) return { ...state, queue: [], next: '0.' };
      if (isOperation(state.next)) {
        return {
          ...state,
          queue: [...state.queue, state.next],
          next: '0.',
        };
      }
      return {
        ...state,
        next: tryAddDot(state.next),
        total: calculate([...state.queue, state.next]),
      };
      // case '+/-':
      //   if (state.operation) {
      //     return state.next
      //       ? { ...state, next: operate(state.next, -1, 'x') }
      //       : { ...state };
      //   }
      //   return state.total
      //     ? { ...state, total: operate(state.total, -1, 'x') }
      //     : { ...state };
      // case '%':
      //   if (state.operation) {
      //     return state.next
      //       ? { ...state, next: operate(state.next, '100', '÷') }
      //       : { ...state };
      //   }
      //   return state.total
      //     ? { ...state, total: operate(state.total, '100', '÷') }
      //     : { ...state };

    default:
  }

  return false;
};

export default process;
