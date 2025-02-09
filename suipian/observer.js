/**
 * @param {*} data vue实例的数据源
 * @param {*} key 键
 * @param {*} val 值
 * 1、递归监听，直到非对象
 * 2、重写get、set方法：
 *  2.1、创建订阅器实例，get根据Dep类的target属性指向进行订阅，set进行通知
 */
function defineReactive(data, key, val) {
  observe(val);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    /**
     ** 每个变量都有一个依赖收集实例，
     ** getter触发时，根据Dep类的静态变量target是否绑定对象来将该对象丢进订阅队列中（即想订阅，就在读取的时候将Dep类的target指向自己）
     ** setter触发时，会通知所有订阅者
     */
    enumerable: true,
    configurable: true,
    get: function() {
      if(Dep.target) {   //判断是否需要添加订阅者
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      console.log(`属性${key}已经被监听了，现在值为：${newVal}`);
      dep.notify(); // 如果数据变化，通知所有订阅者
    }
  });
}

function observe(data) {
  if(!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(function(key){
    defineReactive(data,key,data[key]);
  });
}

/**
 * 订阅器实例，可以添加订阅者、通知订阅者，静态属性target用来订阅时找到订阅者
 */
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();        //通知每个订阅者检查更新
    })
  }
}
Dep.target = null;