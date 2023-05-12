function cloneDeep(data) {
  if(!data || data === null || typeof data !== 'object') return data
  let result = data instanceof Array ? [] : {}
  for(const e in data) {
    result[e] = cloneDeep(data[e])
  }
  return result
}
let a = [1, 2, {a: 3}, true]
let b = cloneDeep(a)
console.log(a === b, b)