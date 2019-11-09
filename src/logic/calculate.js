import operate from './operate';

const calculate = (queue = []) => {
  const [LHS, operation, RHS, ...rest] = queue;

  if (!RHS) return operate(LHS, '+', '0');
  if (rest.length < 2) return operate(LHS, operation, RHS);
  return calculate([operate(LHS, operation, RHS), ...rest]);
};

export default calculate;
