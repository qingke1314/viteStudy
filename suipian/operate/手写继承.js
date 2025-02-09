function Human(name) {
  this.name = name;
  this.color = ['yellow', 'white', 'black'];
}
Human.prototype.getName = function() {
  return this.name;
}
Human.prototype.setColor = function(color) {
  this.color = this.color.filter(e => e === color);
}

function Chinese(name) {
  Human.call(this, name); // super
  this.setColor('yellow');
}
Chinese.prototype = Object.create(Human.prototype);// 该返回的对象的__proto__会指向该参数对象
Chinese.prototype.constructor = Chinese;
Chinese.prototype.getColor = function() {
  return this.color.length > 0 ? this.color[0] : 'no color found';
}


/**
 * ES5定义了一个名为Object.create()的方法，它创建一个对象，
 * 其中第一个参数就是这个对象的原型，
 * Object.create()提供第二个可选参数，用以对对象的属性进行进一步描述。
 */