/**
 * @param {*} classFn 构造函数
 * @param  {...any} args 构造函数参数
 */
function iNew(classFn, ...args) {
  // 1、创建一个空对象
  let obj = {};
  // 2、空对象的原型指针指向构造函数的原型
  obj.__proto__ = classFn.prototype;
  // 3、绑定this并执行构造函数（返回一个实例） args:参数数组   apply：this,数组，call：this,arg1,arg2……
  let res = classFn.apply(obj, args);
  // 4、判断构造函数是否返回了对象/函数，是则返回该构造函数返回，否则返回创建的对象
  return res instanceof Object ? res : obj;
}

function Person(name) {
  console.log('new a person, his name is :', name);
  this.name = name;
}
Person.prototype.setName = function(name) {
  this.name = name;
}
let p = iNew(Person, 'Jack');
console.log(p);