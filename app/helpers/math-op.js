import Ember from 'ember';

export function mathOp(params/*, hash*/) {
  let resultand;

  switch (params[2]) {
    case "*":
      resultand = params[0] * params[1];
      break;
     case "+":
      resultand = params[0] + params[1];
      break;
     case "-":
      resultand = params[0] - params[1];
      break;
     case "/":
      resultand = params[0] / params[1];
      break;
    default:
      resultand = params[0] + params[1];
      break;
  }

  return resultand;
}

export default Ember.Helper.helper(mathOp);
