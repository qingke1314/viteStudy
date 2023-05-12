
class Watcher {
  /**
   * @param {*} vm vue实例
   * @param {*} exp data中对应数据的键值
   * @param {*} cb 更新时执行的callback
   * 初始化时手动get一次值，在此时完成订阅
   */
  constructor(vm, exp, cb) {
    this.vm = vm;    //指向SelfVue的作用域
    this.exp = exp.trim();  //绑定属性的key值
    this.cb = cb;    //闭包
    // 当订阅者建立时,手动获取一次订阅的值
    this.value = this.get();
  }
  /**
   * 订阅的数据变化时执行
   */
  update() {
    this.run();
  }
  /**
   * 判断前后的值
   * 执行初始化时传入的callback函数
   */
  run() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if(value !== oldVal) {
      console.log('更新视图')
      this.value = value;
      this.cb.call(this.vm,value,oldVal);
    }
  }
  /**
   * 手动获取一次订阅的值,令订阅器指向自己,此时重写的get方法
   * 会将指向的自己存入订阅者列表,改变值时通知这些订阅者
   */
  get() {
    Dep.target = this;                    // 缓存自己
    let value = this.vm.data[this.exp];  // 强制执行监听器里的get函数
    Dep.target = null;                   // 释放自己
    return value;
  }
}