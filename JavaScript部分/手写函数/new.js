/**
 * @description 手写new操作符
 * new的过程
 * 1.创建一个新对象
 * 2.新对象的原型指向Constructor.prototype（2，3两步可以通过Object.create(Constructor.prototype)）
 * 3.执行构造函数函数体的内容
 * 4.返回这个对象
 */

function myNew(Constructor, ...args) {
  if (typeof Constructor !== "function")
    throw new TypeError("This is not a constructor");
  let obj = Object.create(Constructor.prototype);
  let res = Constructor.call(obj, ...args);
  return Object(res) === res ? res : obj;
}

let Fn = function (name, age) {
  this.name = name;
  this.age = age;
};

Fn.prototype.say = function () {
  console.log("Fn.prototype.say");
};

// 测试
let t1 = new Fn("Leo", 18);
let t2 = myNew(Fn, "Leo", 20);
console.log(t1);
console.log(t2);
