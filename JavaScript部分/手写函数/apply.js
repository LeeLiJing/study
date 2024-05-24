/**
 * @description 手写apply函数
 * call和apply是用来绑定this，并提供参数，执行后会立即运行原函数，apply以数组形式提供参数
 * @overload
 * 重点：
 * 1.通过arguments获取context上下文以及参数
 * 2.如果上下文为null或者undefined则把上下文指向window。否则则进行包装类操作
 * 3.对参数类型需要进行判断，如果是基本数据类型的Number、String、Booelan则抛出错误
 * 4.如果参数类型是Null、Undefined、Function、空对象则将参数置为空数组
 * 5.如果参数类型为类数组对象则转换为数组
 */

Function.prototype.newApply = function () {
  let context = arguments[0];
  let args = arguments[1];
  let invoke = this;
  let argStr = Object.prototype.toString.call(args);
  const type = argStr.slice(8, argStr.length - 1);
  if (type === "String" || type === "Number" || type === "Boolean") {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  } else if (
    type === "Null" ||
    type === "Function" ||
    type === "Undefined" ||
    (type === "Object" && Object.keys(args).length === 0)
  ) {
    args = [];
  } else if (type === "Object" && Object.keys(args).length !== 0) {
    args = Array.from(args);
  }

  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  const randomKey = Symbol();
  context[randomKey] = invoke;
  if (!context[randomKey]) {
    context = { ...context, randomKey: invoke };
  }
  const res = context[randomKey](...args);
  delete context[randomKey];
  return res;
};

var obj = { name: 1, age: 2 };
var name = "Leo",
  age = 18;
function Fn(height) {
  console.log(
    `%cname:${this.name},age:${this.age},height:${height}`,
    "color:blue"
  );
}

console.group("原生:");
Fn.apply(obj, {});
Fn.apply(obj, null);
Fn.apply(obj, undefined);
Fn.apply(obj);
Fn.apply(obj, function () {});
// Fn.apply(obj, "");
// Fn.apply(obj, 1);
// Fn.apply(obj, true);
// Fn.apply(obj, false);
Fn.apply(obj, { 0: "80cm", length: 1 });
console.groupEnd();
console.group("自己:");
Fn.newApply(obj, {});
Fn.newApply(obj, null);
Fn.newApply(obj, undefined);
Fn.newApply(obj);
Fn.newApply(obj, function () {});
// Fn.newApply(obj, "");
// Fn.newApply(obj, 1);
// Fn.newApply(obj, true);
// Fn.newApply(obj, false);
Fn.newApply(obj, { 0: "80cm", length: 1 });

console.groupEnd();
