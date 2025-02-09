import Depends from './depends.js';

// 代理 this.data.name => this.name
export function proxy(vm) {
  if(typeof vm.data === 'object' && vm.data !== null) {
    Object.keys(vm.data).forEach(e => {
      Object.defineProperty(vm, e, {
        get() {
          return vm.data[e];
        },
        set(value) {
          vm.data[e] = value;
        }
      })
    })
  }
}
// 劫持
function defineReactive(data,key,val) {
  //* val这里很重要，利用函数(形参)存储我们操作的值，该值初始化由用户给出
  const depIns = new Depends();
  Object.defineProperty(data, key, {
    enumerable:true, // 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中
    configurable:true, // 当且仅当该属性的configurable为true时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。
    get() {
      if(global.target) {
        depIns.addDep(global.target);
      }
      return val;
    },
    set:function(newVal) { // 在这里通知监听者
      if(newVal !== val) {
        val = newVal;
        depIns.notify();
      }
    }
  })
}
/**
 * 递归监听
 * @param {*} data 待监听对象
 * @returns void
 */
function observe(data) {
  if(!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach((key) => {
    if(typeof data[key] === 'object' && data[key] !== null) {
      observe(data[key])
    }
    defineReactive(data, key, data[key]); // 待监听对象，对象属性，初始值
  });
}

export default observe;