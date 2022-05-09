function foo1([x, y, ...args] = []) {
  console.log(x, y);
  console.log(x + y, args)
}

function bar(fn) {
  fn([3, 9])
}
bar(foo1)

function foo(x, y) {
  console.log(x, y);
  console.log(x + y)
}

function spreadArgs(fn) {
  return function spreadFn(argsArr) {
    return fn(...argsArr)
  }
}

function gatherArgs(fn) {
  return function gatherFn(...argsArr) {
    return fn(argsArr)
  }
}
bar(spreadArgs(foo))

function combineFirstTwo([v1, v2]) {
  return v1 + v2;
}
console.log([1, 2, 3, 4, 5].reduce(gatherArgs(combineFirstTwo)))