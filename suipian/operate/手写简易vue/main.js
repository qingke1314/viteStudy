import { SelfVue } from "./selfVue.js";
/**
 * 1、遍历data
 *  每个数据都配备一个依赖收集器，
 *  设置getter和setter，
 *      getter时从Watcher的静态属性target获取当前观察者，将其推入依赖队列
 *        （此处添加依赖的时机为watcher和遍历模板的时候，update事件为更改模板值{{ a }}或用户自定义的事件，
 *         具体操作为Watcher.target = this; this.value = this.getter(this); Watcher.target = null;）
 *      setter时依次遍历依赖通知所有观察者
 */
window.global = {};
new SelfVue({
  el: '#app',
  data() {
    return {
      book1: {
        name: 'tst'
      },
    }
  },
  mounted() {
    console.log(this.book1.name);
  },
  created() {
    console.log(this.book1.name);
    this.book1.name = 'newTst'
  }
})