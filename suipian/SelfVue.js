/**
 * 自定义简易Vue实例
 */
class SelfVue {
  /**
   * @param {*} options 配置
   * @returns vue实例
   * 1、设置数据源data
   * 2、设置实例vm
   * 3、为数据源设置代理：this.data.name => this.name
   * 4、数据劫持，重写getter与setter方法，get添加订阅者,set通知订阅者
   * 5、实例化编译器，匹配{{}}的创建订阅者
   * 6、返回自己
   */
  constructor(options) {
    this.data = options.data;
    this.vm = this;
    Object.keys(options.data).forEach((key) => {
      this.proxyKeys(key);     //绑定代理属性
    });
    observe(options.data);
    new Compile(options.el, this.vm);
    return this;
  }
  // 此处代理只是方便不用先.data而已,如vue中的this.$data
  proxyKeys(my_key) {
    var self = this;
    Object.defineProperty(this,my_key,{
      enumerable:false,
      configurable:true,
      get:function proxyGetter() {
        return self.data[my_key];
      },
      set:function proxySetter(newVal) {
        self.data[my_key] = newVal;
      }
    });
  }
}