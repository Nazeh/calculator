import operate from './operate';

const isNumber = (str) => /^[0-9]$/.test(str);
const isOperation = (str) => /^['+','\-','x','÷','%']$/.test(str);

const calculate = ({ state = {}, buttonName }) => {
  if (isNumber(buttonName)) return {};
  if (isNumber(isOperation)) return {};
  switch (buttonName) {
    case 'AC':
      return { total: null, next: null, operation: null };
    case '+/-':
      return {
        total: !parseFloat(next) ? (-1 * total).toString() : total,
        next: parseFloat(next) ? (-1 * next).toString() : next,
      };
    case '.':
      return {
        next: next.match(/\./) ? next : next + buttonName,
      };
    case '%':
      if (next === '0') return { total: operate(total, null, buttonName) };
      return { next: operate(next, null, buttonName) };
    case '=':
      return {
        total: operation ? operate(total, next, operation) : total,
        next: '0',
        operation: null,
      };
    default:
  }
};

export default calculate;
