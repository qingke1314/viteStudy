let obj = {
  name: '',
  age: '',
}
let age = obj.age;
Object.defineProperty(obj, 'age', {
  get(v) {
    console.log(v,'get')
    return age;
  },
  set(val) {
    console.log('set')
    age = val;
  }
})
obj.age = 21
console.log(obj.age)