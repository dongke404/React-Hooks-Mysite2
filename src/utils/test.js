

// var Fn =new Function()

// Fn.prototype.test1=function test(){
//   console.log("这是test1方法")
// }


// console.log(Fn.prototype )


function fn (){
  console.log(1111)
}
const timer=setTimeout(fn,1000)
clearTimeout(timer)

