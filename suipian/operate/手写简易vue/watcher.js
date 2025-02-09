import { getByPath } from "./util.js";

export class Watcher {
  constructor(vm, attr, callback) {
    this.vm = vm;
    this.attr = attr;
    this.callback = callback;
    this.watchValue = this.addWatcher();
  }
  run() {
    const value = getByPath(this.vm, this.attr);
    const oldVal = this.watchValue;
    console.log(value, oldVal)
    if(value !== oldVal) {
      console.log('x!')
      this.watchValue = value;
      this.callback.call(this.vm, value, oldVal);
    }
  }
  addWatcher() {
    global.target = this;
    const value = getByPath(this.vm, this.attr);
    console.log(value, 'watch value')
    global.target = null;
    return value;
  }
}