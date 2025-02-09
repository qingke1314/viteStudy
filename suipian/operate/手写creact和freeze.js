/**
 * Object.create
 * @param {*} proto 传入的原型
 * @returns 返回一个对象
 * 1、判断原型合法
 * 2、新建一个构造函数，该函数原型为传入原型
 * 3、以该函数new一个对象，该对象的_proto_会指向构造函数的原型
 * 4、返回该对象
 */
Object.prototype._create = function(proto) {
  if(!proto || typeof proto !== 'object') return;
  let fn = function() {};
  fn.prototype = proto;
  return new fn();
}

/**
 * Object.freeze
 * 获取对象的所有键值
 * 设置键值不可写、不可删键
 * 防止添加新属性
 */
Object.prototype._freeze = function() {
  const keys = Object.getOwnPropertyNames(this);
  const symbols = Object.getOwnPropertySymbols(this);
  [...keys, ...symbols].forEach(e => {
    Object.defineProperty(this, e, {
      writable: false,
      configurable: false
    })
  })
  Object.preventExtensions(this);
}

let a = { name : 'tst', age: 2 };
a._freeze();
a.name = 'xxx' // 无效
a.b = 'b' // 无效
delete a.age // 无效
console.log(a) // { name: 'tst', age: 2 } 冻结！