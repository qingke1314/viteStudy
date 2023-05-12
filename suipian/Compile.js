const TYPE = {
  STRING: 'string',
  BOOLEAN: 'boolean'
}
class Compile {
  /**
   * @param {*} el dom节点
   * @param {*} vm vue实例
   * 解析dom模板
   */
  constructor(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el); // 获取根源dom节点
    this.compile(this.el);
  }
  /**
   * 编译方法
   * 递归遍历子节点（深度遍历）
   */
  compile(el) {
    Array.from(el.childNodes).forEach(node => {
      if(this.isTextNode(node)) {
        this.compileText(node);
      } else if(this.isElementNode(node)) {
        this.compileElement(node);
      }
      //判断node节点是否有子节点,如果有递归调用compile
      if(node.childNodes && node.childNodes.length){
        this.compile(node);
      }
    })
  }
  /**
   * 处理元素节点
   * 遍历是否为v-指令，然后运行对应更新器方法
   */
  compileElement(node) {
    Array.from(node.attributes).forEach(e => {
      if(this.isDirective(e.name)) {
        const attrName = e.name.substr(2); // v-xx => xx
        const value = e.value;
        this[`${attrName}Updater`] && this[`${attrName}Updater`](node, value, this.vm.data[value])
      }
    })
  }
  /**
   * @param {} node 设置了v-model的节点
   * @param {*} dataKey 如v-model = "name" 则key为name
   * @param {*} dataValue 数据源中data指定的值 如name="tst" 则value为tst
   * 1、初始化时，将绑定的值渲染到节点内
   * 2、设置input事件，反向绑定到数据源中
   * 3、监听该数据，更改时渲染到节点内
   * 由此完成双向绑定
   */
  modelUpdater(node, dataKey, dataValue) {
    node.value = dataValue;
    node.oninput = (event) => {
      this.vm.data[dataKey] = event.target.value;
    }
    new Watcher(this.vm, dataKey, (value) => {
      node.value = value ? value : '';
    });
  }
  /**
   * 处理v-if
   * 1、输入为a === b形式时
   */
  ifUpdater(node, dataKey, dataValue) {
    let flag;
    const reg = /(\s[!=]==\s)/;
    if(reg.test(dataKey)) {
      let eq = reg.exec(dataKey);
      if(!eq) { return; }
      let isEqual = eq[0] === ' === ';
      let leftKey = dataKey.split(eq[0])[0];
      let rightKey = dataKey.split(eq[0])[1];
      let leftVal, rightVal, leftFlag, rightFlag;
      if(/('.*')/.test(leftKey)) { // 是字符串，去除引号
        let len = leftKey.length;
        leftVal = leftKey.slice(1, len - 1);
      } else { // 不是字符串，取数据
        leftVal = this.vm[leftKey]
        leftFlag = true;
      }
      if(/('.*')/.test(rightKey)) {
        let len = rightKey.length;
        rightVal = rightKey.slice(1, len - 1);
      } else {
        rightFlag = true;
        rightVal = this.vm[rightKey]
      }
      flag = isEqual ? leftVal !== rightVal : leftVal === rightVal;
      if(leftFlag || rightFlag) {
        if(leftFlag && leftKey) {
          new Watcher(this.vm, leftKey, (value) => {
            node.hidden = isEqual ? value !== rightVal : value === rightVal;
          });
        }
        if(rightFlag && rightKey) {
          new Watcher(this.vm,rightKey, (value) => {
            node.hidden = isEqual ? leftVal !== value : leftVal === value;
          });
        }
      }
    } else {
      flag = dataValue ? false : true;
      new Watcher(this.vm, dataKey, (value) => {
        node.hidden = value ? false : true;
      });
    }
    node.hidden = flag;
  }
  /**
   * @param {*} node 文本节点
   * @param {*} dataKey 数据源中对应键值
   * 1、判断是否为{{}}写法
   * 2、初始化，将对应数据渲染到文本节点内
   * 3、为所有匹配到的数据绑定订阅者，其中利用闭包缓存最初的模板值，之后发生改变时用该模板替换即可
   */
  compileText(node) {
    const reg = /\{\{(.+?)}\}/g;
    if(!reg.test(node.textContent)) { return; }
    node.textContent = node.textContent.replace(reg, (_, $1) => {
      const initContent = node.textContent;
      const key = ($1 + '').trim();
      new Watcher(this.vm, key, () => {
        let transContent = initContent;
        transContent = transContent.replace(reg, (_, keyNew) => this.vm[String(keyNew).trim()])
        node.textContent = transContent;
      })
      return this.vm[key];
    })
  }
  // 是否文本节点
  isTextNode (node) {
    return node.nodeType === 3;
  }
  // 是否元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
  // 是否指令
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
}