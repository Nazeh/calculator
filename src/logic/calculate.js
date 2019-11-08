import operate from './operate';

const recursiveOperate = (LHS, operation, RHS, ...rest) => {
  if (!operation) return operate(LHS, '+', '0');
  if (rest.length < 2) return operate(LHS, operation, RHS);
  return recursiveOperate(operate(LHS, operation, RHS), rest);
};

const calculate = (stack = []) => recursiveOperate(...stack);

export default calculate;
