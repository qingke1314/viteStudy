/**
 * @param {*} classFn 构造函数
 * @param  {...any} args 构造函数参数
 */
function iNew(classFn, ...args) {
  // 1、创建一个空对象
  const obj = new Object();
  // 2、空对象的原型指针指向构造函数的原型
  obj.__proto__ = classFn.prototype;
  // 3、绑定this并执行构造函数（返回一个实例） args:参数数组   apply：this,数组，call：this,arg1,arg2……
  const res = classFn.apply(obj, args);
  // 4、合法性检验并兜底
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
console.log(p.name, p.__proto__);
// 总结： 继承就是
1 FnA.prototype = Object.create(FnB.prototype); 即是a.prototype.__proto__ = b.prototype;
2 FnA的构造函数super()一下，即call(FnB, ...args)
3 FnA的原型的构造函数指向自身 FnA.prototype.constructor = FnA;
new就是
1 生成一个空对象，其_proto_指向构造函数的prototype
2 绑定this为该空对象并执行构造函数
3 返回执行结果，不为对象则返回该空对象