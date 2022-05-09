var identity = v => v;

var words = "  Now is the time for all...".split(/\s|\b/);
console.log(words)
console.log("=====================")
console.log(words.filter(identity))
console.log("=====================")

function output(msg, formatFn = identity) {
  msg = formatFn(msg);
  console.log(msg)
}

function upper(txt) {
  return txt.toUpperCase()
}
output("Hello world", upper)