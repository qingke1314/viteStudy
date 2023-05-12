function instanceOf(target, ob) {
  let __proto__ = target.__proto__;
  let prototype = ob.prototype;
  if(__proto__ === prototype) {
    return true;
  }
  while(__proto__ !== null) {
    __proto__ = __proto__.__proto__;
    if(__proto__ === prototype) {
      return true;
    }
  }
  return false;
}
console.log(instanceOf([], Array))
console.log(instanceOf([], Object))
console.log(instanceOf(Array, Object))