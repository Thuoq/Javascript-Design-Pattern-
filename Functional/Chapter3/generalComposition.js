function compose(...fns) {
  return function composed(oriParams) {

    // var listFunctions = fns
    while (fns.length) {
      var lastFnc = fns.pop();
      oriParams = lastFnc(oriParams)
    }
    return oriParams;
  }
}
// ES6 version
// var compose = (...fns) => result => {
//   var listFunctions = [...fns];
//   while (listFunctions.length > 0) {
//     result = listFunctions.pop()(result)
//    
//   }
//  return result;
// }

function skipShortWords(words) {
  var filteredWords = []
  for (let word of words) {
    if (word.length > 4) {
      filteredWords.push(word)
    }
  }
  return filteredWords;
}
const {
  unique,
  words,
  text
} = require('./outputToInput')
var biggerWords = compose(skipShortWords, unique, words)
var wordsUsed = biggerWords(text)
console.log(wordsUsed)
// Chúng ta cũng có thể viết compose function bằng cách sử dụng hàm reduce cũng tương tự như trên 

function compose(...fns) {
  return function composed(result) {
    return [...fns].reverse().reduce((result, fn) => {
      return fn(result);
    }, result)
  }
}
// es6 version 
var compose = (...fns) => result => [...fns].reverse().reduce((result, fn) => fn(result), result)