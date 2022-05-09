// Nếu một hàm có nhiều đối số, chúng ta có thể chỉ định một số trong số đó ra trước và để phần còn lại được chỉ định sau.
const CURRENT_USER_ID = 1;
/**
 * ajax(url,data,callback)
 */
// Giả sử chúng ta có 1 hàm trên
function ajax(url, data, callback) {
  console.log('fetching data')
}

function getPerson(data, cb) {
  ajax("http://some.api/person", data, cb)
}

function getOrder(data, cb) {
  ajax("http://some.api/order", data, cb)
}

function getCurrentUser(cb) {
  getPerson({
    user: CURRENT_USER_ID
  }, cb)
}

function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs)
  }
}
var partial =
  (fn, ...presetArg) =>
  (...laterArgs) =>
  fn(...presetArg, ...laterArgs)
var getPerson = partial(ajax, 'http://some.api/person')
var getCurrentUser = partial(getPerson, {
  user: CURRENT_USER_ID
})
getCurrentUser()

// partial application (ứng dụng từng phần)

function add(x, y) {
  return x + y;
}
// hãy tưởng tượng rằng chúng ta thích lấy 1 tập hợp số và thêm 

console.log([1, 2, 3, 4, 5].map(function adder(val) {
  return add(val, 3)
}))
// tại sao chúng ta k thể pass add func vào trong map bởi vì add k gioosng cái func mà map nó mong đợi. 
console.log([1, 2, 3, 4].map(partial(add, 3)))

// bind presiting the this 