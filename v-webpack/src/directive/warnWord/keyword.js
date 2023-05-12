import tools from './tools'
/**
 * 自定义标签标识
 */
let SEED = 0;
const CONTEXT = 'warn-word';
const STYLE_MAP = {
  forbid: {
    color: 'red',
    fontWeight: 'bold'
  },
  warning: {
    color: 'orange'
  }
}
const OPTION = {
  filter: dom => true,
  words: [],
  tag: 'wn',
  wrapClass: () => '',
  warnWordCallBack: () => {}
};
class Keyword {
  constructor(el) {
    this.el = el;
    this.revertFn = [];
    this.options = OPTION;
    this.targets = [];
  }
  /**
   * 1、合并新的运行参数
   * 2、获取过滤器(用户自定义、去空、存在敏感词)
   * 3、获取匹配的文本节点
   * 4、替换所有文本节点
   * 5、执行生命周期钩子
   */
  run(options) {
    this.options = tools.merge(this.options, options);
    console.log('运行中，参数为 >>>', this.options)
    this.filers = this.getFilters();
    let validTextNodes = tools.getTextNodes(this.el, this.filers);
    this.targets = this.replaceDom(validTextNodes);
    this.options.warnWordCallBack(this.targets)
  }
  revert() {
    this.revertFn.forEach(e => {
      e && e();
    })
  }
  /**
   * @param {*} nodes 匹配到的待替换的文本节点
   * @returns 所有匹配到的敏感词数组(去重)
   * 1、切割文本
   * 2、插入新文本
   * 3、保存旧文本并设置回滚函数
   */
  replaceDom(nodes) {
    const target = [];
    for(let node of nodes) {
      let splitDoms = this.splitDoms(node.nodeValue);
      if(splitDoms.length) {
        let fragment = document.createDocumentFragment();
        for(let e of splitDoms) {
          if(e.nodeName.toLowerCase() === this.options.tag) {
            target.push(e.innerText);
          }
          fragment.appendChild(e);
        }
        let parentNode = node.parentNode;
        parentNode.insertBefore(fragment, node);
        this.setRevertFn(node, parentNode, splitDoms);
      }
    }
    return [... new Set(target)];
  }
  /**
   * 还原方法，每个匹配的文本节点都有，当监听字段改变时重画
   * @param {*} node 要替换的文本节点
   * @param {*} parentNode 父容器
   * @param {*} splitDoms 把文本节点切割后的要替换节点
   */
  setRevertFn(node, parentNode, splitDoms) {
    let tempFragment = document.createDocumentFragment();
    tempFragment.appendChild(node);
    this.revertFn.push(() => {
      if(parentNode.contains(splitDoms[0]) && tempFragment.contains(node)) {
        parentNode.insertBefore(node, splitDoms[0]);
        for(let e of splitDoms) {
          if(parentNode.contains(e)) {
            parentNode.removeChild(e);
          }
        }
      }
    })
  }
  /**
   * 递归切割整段文本
   * 返回切割好的节点数组
   * n端匹配文本节点 && m个词 && 每个节点含两词的最大复杂度：(2+1)*n*m
   */
  splitDoms(text) {
    if(!text) return [];
    let words = this.options.words.slice(0);
    let wordItem =  words.shift();
    while(wordItem) {
      let { word, type, desc, ...other } = wordItem;
      let wordReg = this.getRegExp(word.split('').join('\\s*'), 'g');
      let fragment = text.split(wordReg);
      if(fragment.length > 1) {
        const matchTimes = text.match(wordReg);
        return fragment.reduce((prevDoms, textItem, index) => {
          const nextDoms = [...prevDoms, ...this.splitDoms(textItem)];
          if (matchTimes[index]) {
            nextDoms.push(this.createWrapDom(other.tag || this.options.tag, { word: matchTimes[index], type, desc, ...other }))
          }
          return nextDoms;
        }, [])
      }
      wordItem = words.shift();
    }
    return [document.createTextNode(text)]
  }
  /**
   * 生成自定义标签
   * 1、标签文本->匹配的敏感词
   * 2、添加用户设定的类
   * 3、设置标识
   * 4、设置敏感词样式
   * 5、配置必要信息
   */
  createWrapDom(tagName, { word, type, desc, ...other }) {
    const tag = document.createElement(tagName);
    const textNode = document.createTextNode(word);
    const wrapClass = this.options.wrapClass({word, type, desc, ...other});
    wrapClass && tag.classList.add(wrapClass);
    tag.setAttribute(`${CONTEXT}-seed`, `${SEED++}`);
    this.setWordStyle(tag, type);
    tag.appendChild(textNode);
    tag[CONTEXT] = {word, type, desc, ...other};
    return tag;
  }
  /**
   * 根据配置好的敏感词样式为新标签设置样式
   */
  setWordStyle(tag, type) {
    if(STYLE_MAP[type]) {
      Object.keys(STYLE_MAP[type]).forEach(e => {
        tag.style[e] = STYLE_MAP[type][e]
      })
    }
  }
  /**
   * 获取正则
   * 兼容带括号的敏感词
   */
  getRegExp(word, flag) {
    const replaceWord = word.replace(/[()]/g, _ => '\\' + _);
    if (flag) {
      return new RegExp(`${replaceWord}`, flag)
    } else {
      return new RegExp(`${replaceWord}`)
    }
  }
  /**
   * 获取过滤器
   * 去空、匹配敏感词、用户给定
   */
  getFilters() {
    let allWordReg = this.getAllWordReg();
    const filterValue = dom => !!String(dom.nodeValue).replace(/[\n\r]*/g, '');
    const filterWarnWord = dom => (allWordReg && allWordReg.test(dom.nodeValue));
    const filters = [filterValue, filterWarnWord];
    if(this.options.filter && typeof this.options.filter === 'function') {
      filters.push(this.options.filter)
    }
    return filters;
  }
  /**
   * 获取匹配任意敏感词的正则，带模糊匹配
   */
  getAllWordReg() {
    let words = this.options.words.map(e => {
      if(e) {
        return String(e.word).split('').join('\\s*');
      }
    }).filter(Boolean);
    if(words.length === 0) return;
    return this.getRegExp(words.join('|'));
  }
}
export default Keyword;
