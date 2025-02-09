import observe, { proxy } from './observer.js'
import { Compile } from './compile.js';

export class SelfVue {
  constructor({ el, data, created, mounted }) {
    this.el = document.querySelector(el);
    this.data = data();
    proxy(this, this.data);
    observe(this.data);
    if(created && typeof created === 'function') {
      created.call(this);
    }
    new Compile(this.el, this);
    if(mounted && typeof mounted === 'function') {
      mounted.call(this);
    }
  }
}