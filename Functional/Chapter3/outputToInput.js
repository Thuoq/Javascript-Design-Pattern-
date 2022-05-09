// composition function 
// TO compose function together, pass the output of the first function call as the input of the second function call, that value directly passed as a an argument to map which return array

function words(str) {
  return String(str).toLocaleLowerCase().split(/\s|b/).filter(function alpha(v) {
    return /^[\w]+$/.test(v);
  })
}

function unique(list) {
  return new Set(list)
}
var text = "To compose two functions together, pass the output of the first function call as the input of the  second function call.";
var wordsFound = words(text);
console.log(wordsFound.length)
var wordUsed = unique(wordsFound)
console.log(wordUsed.size)

function compose(fnc1, fnc2) {
  return function composed(origValue) {
    return fnc1(fnc2(origValue))
  }
}
var wordUsed = compose(unique, words)
console.log(wordUsed(text).size)