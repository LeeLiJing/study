/**
 * @description 手写bind函数
 *
 * 重点：
 * 1.判断绑定的函数是否为函数，
 * 2.新的函数原型指向绑定函数的原型
 * 3.new之前的参数和新的参数合并
 */

Function.prototype.newBind = function () {
  const thisArg = arguments[0];
  const boundParams = Array.from(arguments).slice(1);
  const boundTargetFunc = this;
  if (typeof boundTargetFunc !== "function")
    throw new TypeError("the bound target function muse be a function");
  function fBound() {
    const restParams = [...arguments];
    return boundTargetFunc.apply(
      this instanceof fBound ? this : thisArg,
      boundParams.concat(restParams)
    );
  }
  fBound.prototype = Object.create(boundTargetFunc.prototype);
  return fBound;
};

var o = { name: 1, age: 2 };
var name = "Leo",
  age = 18;
function Fn(height, Gender) {
  console.log(
    `%cname:${this.name},age:${this.age},height:${height},Gender:${Gender}`,
    "color:blue"
  );
}
Fn.prototype.say = function () {
  console.log("Fn.prototype.say");
};

console.group("原生:");
let fn = Fn.bind(o, "80cm", 100, 3, 4);
fn();
let obj = new fn("male");
obj.say();
console.groupEnd();

console.group("自己:");
let fn1 = Fn.newBind(o, "81cm", 200, 2, 3);
fn1();
let obj1 = new fn1("famle");
obj1.say();
console.groupEnd();
