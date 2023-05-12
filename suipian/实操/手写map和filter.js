Array.prototype._map = function(fn) {
  if(typeof fn !== 'function') return this;
  const arr = this;
  const newArr = [];
  for(let i = 0; i < arr.length; i++) {
    const result = fn(arr[i]);
    newArr.push(result);
  }
  return newArr;
}
Array.prototype._filter = function(fn) {
  if(typeof fn !== 'function') return this;
  const arr = this;
  const newArr = [];
  for(let i = 0; i < arr.length; i++) {
    const result = fn(arr[i]);
    result && newArr.push(arr[i]);
  }
  return newArr;
}
let a = [1, 2, 3];
let b = a._map(e => 2 * e)
let c = a._filter(e => e % 2 === 0)
console.log(b, c);