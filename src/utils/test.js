

// var Fn =new Function()

// Fn.prototype.test1=function test(){
//   console.log("这是test1方法")
// }


// console.log(Fn.prototype )
var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)

console.log(dayjs().fromNow())

