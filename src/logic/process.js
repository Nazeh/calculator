import calculate from './calculate';

const process = (
  state = { queue: [], next: null, total: null },
  buttonName,
) => {
  const isNumber = (str) => /^\-?\d*\.?\d+%*$/.test(str);
  const isOperation = (str) => /^['+','\-','x','÷']$/.test(str);

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

  const tryAddDot = (str) => (str.includes('.') ? str : `${str}.`);
  const negate = (str) => (str[0] === '-' ? str.slice(1) : `-${str}`);

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
    case '+/-':
      return isNumber(state.next)
        ? {
          ...state,
          next: negate(state.next),
          total: calculate([...state.queue, negate(state.next)]),
        }
        : { ...state };

    case '%':
      return isNumber(state.next)
        ? {
          ...state,
          next: `${state.next}%`,
          total: calculate([...state.queue, `${state.next}%`]),
        }
        : { ...state };
    default:
  }

  return false;
};

export default process;
