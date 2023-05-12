export default {
  /**
   * 根据路径从vue组件中取到对应的值
   */
  getByPath(vm, address) {
    if(!vm || !address) return;
    const splitReg = /\.|(?=\[.+\])/g;
    if(!address) return;
    const indexArr = address.split(splitReg);
    let index = 0;
    let value;
    while(index < indexArr.length) {
      let match = indexArr[index].match(/\[(.+)\]/)
      value = match ? vm[match[1]] : vm[indexArr[index]]
      index++;
    }
    return value;
  },
  /**
   * 是否是对象
   */
  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  /**
   * @param  {...any} target 待合并对象，优先级后者大于前者
   * @returns 合并完的新对象
   */
  merge(...target) {
    const _merge = (origin, extend) => {
      if(!this.isObject(origin) || !this.isObject(extend)) return;
      for(let key in extend) {
        if(this.isObject(extend[key]) && this.isObject(origin[key])) {
          _merge(origin[key], extend[key])
        } else {
          origin[key] = extend[key];
        }
      }
    }
    return target.reduce((acc, e) => {
      _merge(acc, e)
      return acc
    }, {})
  },
  /**
   * 返回所有文本节点
   */
  getTextNodes(el, filters = []) {
    const nodes = [];
    const searchLoop = (node) => {
      if(node.nodeType === Node.TEXT_NODE) {
        const valid = filters.every(e => e(node))
        if(valid) {
          nodes.push(node);
        }
      }
      if (!node || ![Node.DOCUMENT_FRAGMENT_NODE, Node.ELEMENT_NODE].includes(node.nodeType)) {
        return
      }
      if(node.childNodes) {
        for(let item of node.childNodes) {
          searchLoop(item)
        }
      }
    }
    searchLoop(el);
    return nodes;
  },
}
