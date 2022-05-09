var mySingleton = {  
  property1: "something",
  property2 : "something else",
  method1: function() { 
    console.log("Hello world")
  }
}


// Nếu bạn muốn mở rộng điều này hơn nữa, bạn có thể thêm các thành viên và phương thức private của riêng bạn vào singleton bằng cách đóng gói các khai báo biến và hàm bên trong một bao đóng. Chỉ hiển thị những gì bạn muốn công khai là khá dễ hiểu từ thời điểm đó như được minh họa dưới đây:

var mySingleton = function () {  
  var privateVariable = 'some thing private';
  function showPrivate() { 
    console.log(privateVariable)
  }
  return  { 
    publicMethod: function()  { 
      showPrivate()
    },
    publicVar: "the public can see this"
  }
}
var single = mySingleton()
single.publicMethod()
// Ví dụ trên là tuyệt vời, nhưng tiếp theo hãy xem xét một tình huống mà bạn chỉ muốn khởi tạo singleton khi nó cần thiết. Để tiết kiệm tài nguyên, bạn có thể đặt mã khởi tạo bên trong một hàm khởi tạo khác như sau:  
var Singleton = (function() { 
  var instantiated; 
  function init()  { 
    return { 
      publicMethod: function() { 
        console.log("Hellow rold")
      },
      publicProperty: "test"
    }
  }

  return { 
    getInstance : function() { 
      if(!instantiated) { 
        instantiated = init()
      }
      return instantiated;
    }
  }
})()