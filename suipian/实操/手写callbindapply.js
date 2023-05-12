Function.prototype._call = function(context) {
  // 不是函数在调用则返回
  if(typeof this !== 'function') {
    return;
  }
  // 确定要给函数绑定的新的上下文环境
  context = context || window;
  // 复制函数
  context._newFn = this;
  // 执行函数并返回
  let result = context._newFn([...arguments].slice(1))
  delete context._newFn;
  return result;
}

Function.prototype._apply = function(context) {
  if(typeof this !== 'function') {
    return;
  }
  context = context || window;
  context._newFn = this;
  // apply给的是参数数组
  const args = arguments[1] && Array.isArray(arguments[1]) ? arguments[1] : [];
  let result = context._newFn(...args)
  delete context._newFn;
  return result;
}

Function.prototype._bind = function(context) {
  if(typeof this !== 'function') {
    return;
  }
  context = context || window;
  // 返回apply函数，同时达到执行+改变this的效果
  return () => {
    return this._apply(context, [...arguments].slice(1));
  }
}

let myContext = {
  name: '小明',
  age: 15,
  clgContext() { console.log('context >>>', this); }
}
function fn() {
  this.clgContext && this.clgContext();
  console.log('this.age >>>', this.age);
}
myContext.fn = fn._bind(myContext);
myContext.fn();