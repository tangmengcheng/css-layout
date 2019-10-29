// function flattenDeep(arr) {
//   return arr.flat(Math.pow(2,53) - 1);
// }

// function flattenDeep(arr) { 
//   return arr.reduce((prev, next) => Array.isArray(next) ? prev.concat(flattenDeep(next)) : prev.concat(next), [])
// }
// console.log(flattenDeep([1, [2, [3, [4]], 5]]))

Function.prototype.call = function (context) {
  /**
   * 注意：如果第一个参数传入的是null或者undefined，那么this指向window/global
   * 如果第一个参数传入的不是null或者undefined，那么必须是一个对象
   */
  if (!context) {
    // context为null或者undefined
    context = typeof window === 'undefined' ? global : window;
  }
  context.fn = this; // 将this指向当前函数
  let rest = [...arguments].slice(1); // 获取除第一个以后的参数
  let result = context.fn(...rest); // 隐士绑定，当前函数的this指向了context
  delete context.fn;
  return result;
}


Function.prototype.apply = function (context, rest) {
  if (!context) {
    context = typeof window === 'undefined' ? global : window
  }
  context.fn = this;
  let result;
  if (rest === undefined || rest === null) {
    result = context.fn(rest)
  } else if (typeof rest === 'object') {
    result = context.fn(...rest);
  }
  delete context.fn;
  return result;
}


Function.prototype.bind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  let self = this; // 缓存this
  let args = [...arguments].slice(1);

  function Fn() {}
  Fn.prototype = this.prototype;
  let bound = function () {
    let rest = [...args, ...arguments];
    context = this instanceof Fn ? this : context || this;
    return self.apply(context, rest)
  }
  // 原型链
  bound.prototype = new Fn();
  return bound;
}


function news(func) { 
  let obj = {};
  obj.__proto__ = func.prototype;
  let res = func.call(obj)
  if(res && typeof res === 'object' | typeof res === 'function') {
    return res;
  }
  return obj;
 }
 
// 简易版
// JSON.parse(Json.stringify(obj))
 function deepClone(obj) {
  if(obj === null) return null; // null情况
  if(obj instanceof RegExp) return new RegExp(obj);
  if(obj instanceof Date) return new Date(obj);
  if(typeof obj !== 'object') {
    return obj;
  }
  /**
   * 如果是数组，那么obj.constructor是[Function: Array]
   * 如果是对象，那么obj.constructor是[Function: Object]
   */
  let t = new obj.constructor();
  for(let key in obj) {
    t[key] = deepClone(obj[key])
  }
  return t;
 }


 function curry(fn, args = []) {
   return function() {
     let rest = [...args, ...arguments];
     if(rest.length < fn.length){
       return curry.call(this, fn, rest)
     } else {
       return fn.apply(this, rest)
     }
   }
 }

 function test(a, b, c) {
   return a+b+c;
 }
 let sumFn = curry(test);
 console.log(sumFn(1)(2)(3))
console.log(sumFn(1)(2, 3))



// var name = 'Jack';
// function person(age, job, gender) { 
//   console.log(this.name, age, job, gender);
//  }
//  var tmc = {name: 'tmc'}
//  let result = person.bind(tmc, 24, 'enginner')('man')

// var foo = {
//   name: 'tmc'
// }
// var name = 'sfm';

// function bar(job, age) {
//   console.log(this.name)
//   console.log(job, age)
// }

// // bar.call(foo, 'job', 24)
// bar.call(null, 'teacher', 35)