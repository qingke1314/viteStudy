import { getByPath } from "./util.js";
import { Watcher } from "./watcher.js";

export class Compile {
  static VAR_REG = /\{\{(.*)\}\}/;
  constructor(el, vm) {
    this.vm = vm;
    this.el = el;
    if(!this.el || this.el.nodeType !== Node.ELEMENT_NODE) {
      return new Error('节点类型不正确');
    }
    this.fragment = this.handleNodeToFragment();
    this.compileElement(this.fragment);
    this.handleFragmentToNode();
  }
  handleFragmentToNode() {
    let child = this.fragment.firstChild;
    while(child) {
      this.el.appendChild(child);
      child = this.fragment.firstChild;
    }
  }
  handleNodeToFragment() {
    const fragment = document.createDocumentFragment();
    let child = this.el.firstChild;
    while(child) {
      fragment.appendChild(child);
      child = this.el.firstChild;
    }
    return fragment;
  }
  compileElement(compileNode) {
    const childNodes = compileNode.childNodes;
    [].slice.call(childNodes).forEach(node => {
      const text = node.textContent;
      if(node.nodeType === Node.TEXT_NODE && Compile.VAR_REG.test(text)) {
        this.compileTextNode(node, Compile.VAR_REG.exec(text)[1]);
      }
      if(node.childNodes && node.childNodes.length) {
        this.compileElement(node);
      }
    });
  }
  compileTextNode(node, exp) {
    const value = getByPath(this.vm, exp);
    node.textContent = value ? value : '';
    new Watcher(this.vm, exp, (value) => {
      node.textContent = value;
    })
  }
}