// Let’ s examine a technique similar to partial application, where a
// function that expects  multiple arguments is broken down into successive chained functions that each take  a single argument(arity: 1) and return another function to accept the next argument

// CUrrying function 


function curry(fn, arity = fn.length) {
  return (
    function nextCurried(prevArgs) {
      return function curried(nextArg) {
        var args = [...prevArgs, nextArg]
        if (args.length >= arity) {
          return fn(...args)
        } else {
          return nextCurried(args)
        }
      }
    }
  )([])
}