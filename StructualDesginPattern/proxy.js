// A proxy 
// là 1 object rằng nó có thể điều khiển truy cập tới 1 object khác được gọi là subject. Proxy và subject  có 1 interface xác định và đây cho phép chúng ta swap 1 trong 2 trúng 

// A proxy ngăn chặn tất cả hoặc 1 vài operation rằng nó thực hiện trên cái object subject 
// Client => Proxy => Subject 

// A Proxy có thể rất hữu ích trong 1 vài hoàn cảnh, ví dụ: 

// Data Validation: 
// security 
// caching 
// lazy init: If create subject expensive, proxy có thể delay nó đến khi nào nó thật sự cần thiết 
// Logging 


// Techniques for implementing proxies 


// when proxy an object, we can quyết định ngăn chạn tất của các methods của nó hoặc 1 vài method
// Example: 

class StackCalculator { // LIFO 
  constructor() {
    this.stack = []
  }
  putValue(value) {
    this.stack.push(value)
  }

  getValue() {
    return this.stack.pop()
  }
  peekValue() {
    return this.stack[this.stack.length - 1]
  }
  clear() {
    this.stack = []
  }
  divide() {
    const divisor = this.getValue()
    const dividend = this.getValue()
    const result = dividend / divisor;

    this.putValue(result)
    return result;
  }
  multiply() {
    const multiplicand = this.getValue()
    const multiplier = this.getValue()
    const result = multiplier * multiplicand;

    this.putValue(result)
    return result;
  }
}

var calculator = new StackCalculator()

calculator.putValue(3)
calculator.putValue(2)
console.log(calculator.multiply()) // 3 * 2 // 6 

calculator.putValue(2)
console.log(calculator.multiply())

// so, ở trên chúng ta  taọ 1 object subject giờ chúng ta sẽ sửa lúc chia với số 0, vì js nó sẽ return infinity 

// Object composition 

class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  // proxied method 
  divide() {
    const divisor = this.calculator.peekValue()
    if (divisor == 0) {
      throw Error("Division by 0")
    }
    return this.calculator.divide()
  }
  putValue(value) {
    return this.calculator.putValue()
  }

  getValue() {
    return this.calculator.getValue()
  }
  peekValue() {
    return this.calculator.clear()
  }

  clear() {
    return this.calculator.clear()
  }
  multiply() {
    return this.calculator.multiply()
  }
}
var calculator = new StackCalculator()
var safeCalculator = new SafeCalculator(calculator)

// Safe calculator object là 1 proxy cho ỏginal calculator insatnce
// để ngăn chặn cái safe này chúng ta phải làm 1 cái implêmntation những cái liên quan tới ái thằng chia 

// nhưng chúng ta có thể thay thế bằng 

function createSafeCalculator(calculator) {
  return {
    divide() {
      const divisor = calculator.peekValue()
      if (divisor == 0) {
        throw Error("Division by 0")
      }
      return calculator.divide()
    },
    putValue(value) {
      return calculator.putValue()
    },

    getValue() {
      return calculator.getValue()
    },
    peekValue() {
      return calculator.clear()
    },

    clear() {
      return calculator.clear()
    },
    multiply() {
      return calculator.multiply()
    }
  }

}

var safeCalculator = createSafeCalculator(calculator)
// những cái implementation ở trên thì bằng func thì nó dễ hơn nhưng chúng ta thấy 1 vấn đề ở đây là gì? việc mình implementation rất nhiều các method, làm cho rất là kiểu vãi lúa =))). chúng ta có thể sử dụng 1 cách khác goi là Object augmentation 

// Object augmentation 
// object augmentation  đơn giả và các chung nhất nó chỉ sửa subject object directly repace a method mới chính là proxied 


function patchToSafeCalculator(calculator) {
  const divideOrig = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue()
    if (divisor == 0) {
      throw Error("Division by 0")
    }
    return divideOrig.apply(calculator)
  }
  return calculator;
}

var calculator = new StackCalculator()
var safeCalculator = patchToSafeCalculator(calculator)
// nhung viec trên làm chúng ta mutation cái subject nó, việc đó k nên. 
// Proxy Object 
// target: proxy object applied 
// handle is special object chusng ta dinh nghia de xu ly no 
// handle object bao gồm 1 series of opstional method với định nghia tên là trap methods( apply, get,set ,has)
// const proxy = new Proxy()

var safeCalculatorHandler = {
  get: (target, property) => {
    if (property === 'divide') {
      return function () {
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw Error("Division by 0")
        }
        return target.divide()
      }
    }
    return target[property]
  }
}
var calculator = new StackCalculator()
var safeCalculator = new Proxy(
  calculator,
  safeCalculator
)


// Các khả năng và giới hạn của Proxy object 
const evenNumber = new Proxy([], {
  get: (target, idx) => idx * 2,
  has: (target, number) => number % 2 == 0
})
console.log(2 in evenNumber)