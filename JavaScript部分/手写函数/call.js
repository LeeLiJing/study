/**
 * @description 手写call函数
 * call和apply是用来绑定this，并提供参数，执行后会立即运行原函数，call以列表形式提供参数
 * @overload
 * 重点：
 * 1.通过arguments获取context上下文以及参数
 * 2.如果上下文为null或者undefined则把上下文指向window。否则则进行包装类操作
 */

Function.prototype.newCall = function () {
  let context = arguments[0];
  let args = Array.from(arguments).slice(1);
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const randomKey = Symbol();
  context[randomKey] = this;
  if (!context[randomKey]) {
    context = { ...context, randomKey: this };
  }

  const res = context[randomKey](...args);
  delete context[randomKey];
  return res;
};

let obj = {
  name: "小黑",
  age: 10,
};

let Fn = function (height) {
  console.log(
    `%cname:${this.name},age:${this.age},height:${height}`,
    "color:red"
  );
};

var name = "cat",
  age = 1000;

console.group("原生:");
Fn.call(null, "80cm");
Fn.call(undefined, "81cm");
Fn.call(false, "82cm");
Fn.call(true, "83cm");
Fn.call("", "84cm");
Fn.call(1, "85cm");
Fn.call(function aa() {}, "86cm");
Fn.call(this, "87cm");
Fn.call("88cm");
console.groupEnd();

console.group("自己:");
Fn.newCall(null, "80cm");
Fn.newCall(undefined, "81cm");
Fn.newCall(false, "82cm");
Fn.newCall(true, "83cm");
Fn.newCall("", "84cm");
Fn.newCall(1, "85cm");
Fn.newCall(function aa() {}, "86cm");
Fn.newCall(this, "87cm");
Fn.newCall("88cm");
Fn.call(obj, "90cm");
console.groupEnd();
