/**
 * @description ES5 寄生继承
 */
function inherit(childClass, superClass) {
  childClass.prototype = Object.create(superClass.prototype);
  childClass.prototype.constructor = childClass;
}
function SuperClass(name) {
  this.name = name;
  this.superConstructorFun = function () {
    console.log(`这个是父类构造函数方法`);
  };
}

SuperClass.prototype.superProtoFun = function () {
  console.log(`这个是父类原型方法`);
};
SuperClass.prototype.superProtoElement = "父类属性";

inherit(ChildClass, SuperClass);

function ChildClass(name, flat) {
  SuperClass.call(this, name);
  this.flat = flat;
  this.childConstructorFun = function () {
    console.log(`这个是子类构造函数方法`);
  };
}
ChildClass.prototype.childProtoFun = function () {
  console.log(`这个是子类原型方法`);
};
ChildClass.prototype.childProtoElement = "子类属性";

console.group("父类的实例:");
let superClass = new SuperClass("小黑");
console.log(superClass);
console.log(superClass.__proto__);
console.log(
  "superClass.constructor === SuperClass :",
  superClass.constructor === SuperClass
);
console.log(
  "superClass.constructor === SuperClass.prototype.constructor :",
  superClass.constructor === SuperClass.prototype.constructor
);
console.log(
  "superClass.__proto__ === SuperClass.prototype :",
  superClass.__proto__ === SuperClass.prototype
);
console.log(
  "SuperClass.__proto__ === Function.prototype :",
  SuperClass.__proto__ === Function.prototype
);
console.groupEnd();

console.group("子类的实例:");
let childClass = new ChildClass("小白", "子类传参");
console.log(childClass);
console.log(childClass.__proto__);
console.log(
  "childClass.constructor === ChildClass :",
  childClass.constructor === ChildClass
);
console.log(
  "childClass.constructor === ChildClass.prototype.constructor :",
  childClass.constructor === ChildClass.prototype.constructor
);
console.log(
  "ChildClass.__proto__ === Function.prototype :",
  ChildClass.__proto__ === Function.prototype
);
childClass.childConstructorFun();
console.log(childClass.flat);
childClass.childProtoFun();
console.log(childClass.childProtoElement);
childClass.superConstructorFun();
childClass.superProtoFun();
console.log(childClass.superProtoElement);
console.groupEnd();
