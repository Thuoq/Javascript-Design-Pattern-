class  Profiler { 
  constructor(label) { 
    this.label = label;
    this.lastTime = null;
  }

  start() { 
    this.lastTime = process.hrtime()
  }
  end() { 
    const diff = process.hrtime(this.lastTime)
    console.log(`Timer ${this.label} took ${diff[0]} seconds ` + `${diff[1]} nano second`)
  }
}
// hãy tưởng tượng chúng ta đang trong dự án thật muốn tính thời gian của các route khác nhau, chúng ta có thể dễ dàng tưởng tượng những thông tin in ra console. đặc biệt trong production environment. Chúng ta chỉ muốn test nó trên dev mode. chúng ta có thể log nó trong 1 cái gì đó hoặc tắt nó đi trong production mode.. Đó là rất sự rõ ràng chúng ta tạo 1 cái Profiler object thẳng luôn ở đây là dùng từ khoá new, thì chúng ta phải sử dụng 1 ít code để xử lý đó =)). 

// thay vào đó chúng ta sử dụng factory abstract creation của Profilẻ object để, dựa trên cái điều kiện mà chương trình chúng ta run. 

const noopProfiler = { 
  start(){ }, 
  end() {}
}

function createProfiler(label) { 
  if(process.env.NODE_ENV === 'production') {
    return noopProfiler;
  }
  return new Profiler(label)
}

function getAllFactors(intNumber) { 
  const profiler = createProfiler(`finding all factors of ${intNumber}`)
  profiler.start()

  const factors = []
  for(let factor = 2 ; factor <= intNumber ; factor ++) { // O(n)
    while((intNumber % factor) == 0) { 
      factors.push(factor)
      intNumber/= factor;
    }
  } // O(n^2)
  profiler.end()
  return factors
}
const myNumber = process.argv[2]
const myFactors = getAllFactors(myNumber)
console.log(myFactors)