import _ from 'lodash';
import operate from './operate';

const reduce = (queue) => {
  const [LHS, operation, RHS, ...rest] = queue;

  if (!RHS) return operate(LHS, '+', '0');
  if (rest.length < 2) return operate(LHS, operation, RHS);
  return reduce([operate(LHS, operation, RHS), ...rest]);
};

const reduceMultDiv = (queue) => {
  const reducedQueue = [];
  let temp = [];

  queue.forEach((el) => {
    if (el === '+' || el === '-') {
      reducedQueue.push(reduce(temp), el);
      temp = [];
    } else { temp.push(el); }
  });
  reducedQueue.push(reduce(temp));

  return reducedQueue;
};

const calculate = (queue = []) => reduce(reduceMultDiv(queue));

export default calculate;
