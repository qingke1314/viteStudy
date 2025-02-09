import { BulbTwoTone } from '@ant-design/icons';
import { renderToStaticMarkup } from "react-dom/server"
import './wornWordTitle.scss';

const innerHtml =  `<span>${renderToStaticMarkup(<BulbTwoTone twoToneColor={'red'} />)}</span>`;
/**
 * 对所给dom节点内部全部敏感词文本节点进行替换
 * @param {*} id dom节点的id
 * @param {*} list 敏感词列表，[{ word: 'xx' }]
 * @param {*} options 选项
 * @returns void
 */
export class AddWatch {
  static BASE_OPTIONS = {
    activeFilter: null, // 自定义过滤器（作用于textNode）
    wrapClass: () => '', // 自定义类名
    immediate: true, // 是否创建时就查找一次
  };
  static WARN_WORD_TAGNAME = 'ww';
  constructor(id, list, options) {
    this.id = id;
    this.el = document.getElementById(id);
    this.__revertFns__ = [];
    this.list = list;
    this.finalOptions = { ...AddWatch.BASE_OPTIONS, ...options };
    if(this.finalOptions.immediate) {
      this.run();
    }
  }
  /**
   * 核心运行方法
   */
  run() {
    this.__revertFns__.forEach(e => {
      e();
    });
    this.__revertFns__ = [];
    this.el = document.getElementById(this.id);
    if(!this.el || this.el.nodeType !== Node.ELEMENT_NODE) {
      console.log('节点类型不正确!');
      return;
    }
    const textNodes = this.getTextNodes();
    if(textNodes.length > 0) {
      textNodes.forEach(node => {
        const splitNodes = this.getSplitNodes(node.nodeValue).filter(node => !!node);
        // 替换敏感词文本节点
        if (splitNodes.length > 0) {
          const _parentNode = node.parentNode;
          const _fragment = document.createDocumentFragment();
          splitNodes.forEach(e => {
            _fragment.appendChild(e);
          });
          const _tempFragment = document.createDocumentFragment();
          _parentNode.insertBefore(_fragment, node);
          _tempFragment.appendChild(node);
          // 回滚函数
          this.__revertFns__.push(() => {
            if (_tempFragment.contains(node) && _parentNode.contains(splitNodes[0])) {
              _parentNode.insertBefore(node, splitNodes[0]);
            }
            splitNodes.forEach((ele, i) => {
              _parentNode.contains(ele) && _parentNode.removeChild(ele);
            })
          });
        }
      })
    }
  }
  /**
   * @param {*} target
   * @returns 获取输入参数的类型
   */
  getType(target) {
    let _objectType = Object.prototype.toString.call(target)
    let _matchArr = _objectType.match(/\[object (\w+)\]/)
    if (_matchArr) {
      return _matchArr[1]
    }
    return void 0
  }
  /**
   * @param {String} word
   * @param {*} type eg: 'g'
   * @returns 模糊正则
   */
  getFinalReg(word, type) {
    const formatWord = word.split('').join('[\\s]*').replace(/[()]/g, _ => '\\' + _);
    if(type) return new RegExp(`${formatWord}`, type);
    return new RegExp(`${formatWord}`);
  };
  /**
   * @param {*} word
   * @returns 兼容多类型输入获取敏感词正则
   */
  getReg(word) {
    let reg = null;
    const type = this.getType(word);
    switch(type) {
      case 'String':
        reg = this.getFinalReg(word, 'g');
        break;
      case 'RegExp':
        reg = word;
        break;
      case 'Function':
        reg = this.getFinalReg(word());
        break;
      default:
        reg = this.getFinalReg(String(word), 'g');
        break;
    };
    return reg;
  }
  /**
   * 空、非自定义敏感词标签、正则存在敏感词、自定义过滤
   * @returns 过滤器数组
   */
  getFilters() {
    const emptyFilter = dom => !!dom.nodeValue.replace(/[\r\n]*/g, '');
    const tagNameFilter = dom => dom.parentNode.tagName.toLowerCase() !== AddWatch.WARN_WORD_TAGNAME;
    // 敏感词正则匹配
    const allKeywords = this.list.map(e => this.getReg(e.word).source);
    const allKeywordsReg = new RegExp(allKeywords.join('|'));
    const regFilter = dom => allKeywordsReg.test(dom.nodeValue);
    if(typeof this.finalOptions.activeFilter !== 'function') return [emptyFilter, tagNameFilter, regFilter];
    return [emptyFilter, tagNameFilter, regFilter, this.finalOptions.activeFilter];
  }
  /**
   * 用所有过滤器对文本节点进行过滤 判断是否合法
   * @param {*} dom
   * @returns bool
   */
  getIsValid(dom) {
    const filters = this.getFilters();
    for (const filter of filters) {
      if (!filter(dom)) {
        return false;
      }
    }
    return true;
  }
  /**
   * 递归捕捉所有符合标准的文本节点
   */
  getTextNodes() {
    const allMatchNodes = [];
    const loopFn = (el) => {
      // 捕捉逻辑
      if(el.nodeType === Node.TEXT_NODE && this.getIsValid(el)) {
        allMatchNodes.push(el);
      }
      // 递归逻辑
      if (!el || el.nodeType !== Node.ELEMENT_NODE || el.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        return; // 非元素或碎片没有儿子
      }
      const _children = el.childNodes;
      for (let _index = 0; _index < _children.length; _index++) {
        loopFn(_children[_index]); // 存在儿子节点，则递归捕捉
      }
    };
    loopFn(this.el);
    return allMatchNodes;
  }
  /**
   * 创建自定义标签（带icon、tooltip、颜色）
   * @param {*} wordItem
   */
  createNode(wordItem) {
    const { word = '', desc = '' } = wordItem;
    const warnWordNode = document.createElement(AddWatch.WARN_WORD_TAGNAME);
    warnWordNode.setAttribute('label-title', desc);
    const textNode = document.createTextNode(word);
    const wrapClass = this.finalOptions.wrapClass(word);
    const iconNode = document.createElement('span');
    iconNode.innerHTML = innerHtml;
    warnWordNode.appendChild(iconNode);
    warnWordNode.appendChild(textNode);
    if(wrapClass) warnWordNode.classList.add(wrapClass);
    return warnWordNode;
  }
  /**
   * 根据敏感词将text分为多段
   * @param {*} text 待分割文本
   * @returns 分割后的textNode或wwNode数组
   */
  getSplitNodes(text) {
    if(!text.replace(/[\s\n]/g, '')) return [];
    for(const e of this.list) {
      const reg = this.getReg(e.word);
      const splitTextArr = text.split(reg);
      if(splitTextArr.length > 1) {
        let formattedSplitTextArr = [];
        const match = text.match(reg);
        splitTextArr.forEach((splitText, i) => {
          formattedSplitTextArr = [...formattedSplitTextArr, ...this.getSplitNodes(splitText)];
          if(match[i]) { // 在split切割掉的剩下的空字符串的位置拼上自定义的敏感节点
            formattedSplitTextArr.push(this.createNode(e));
          }
        });
        return formattedSplitTextArr;
      }
    }
    return [document.createTextNode(text)];
  }
}