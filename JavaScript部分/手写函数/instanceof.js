/**
 * @description instanceof
 */

function createInstanceof(L, R) {
  // 如果左侧参数不是对象直接返回false
  if (Object(L) !== L) return false;
  // 右侧函数可以认为只能为函数，且不能没有prototype属性
  if (typeof R !== "function" || !R.prototype)
    throw new TypeError("Right-hand side of 'instanceof' is not an object");
  let proto = Object.getPrototypeOf(L);
  while (proto !== null) {
    if (proto === R.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

console.group("原生instanceof:");
console.log(1 instanceof Number);
console.log("str" instanceof String);
console.log(true instanceof Boolean);
console.log([] instanceof Array);
console.log({} instanceof Object);
console.log(function () {} instanceof Function);
console.groupEnd();

console.group("手写instanceof:");
console.log(1 instanceof Number);
console.log("str" instanceof String);
console.log(true instanceof Boolean);
console.log([] instanceof Array);
console.log({} instanceof Object);
console.log(function () {} instanceof Function);
console.groupEnd();
