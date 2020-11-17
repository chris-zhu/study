export function generateCode(attr) {
  let code = ''
  for (let prop in attr) {
    code += `let ${prop} = ${JSON.stringify(attr[prop])};`
  }
  return code
}

export function isTrue(expression, env) {
  let bool = false;
  let code = env;
  code += "if(" + expression + ") {bool = true;}";
  eval(code);
  return bool;
}