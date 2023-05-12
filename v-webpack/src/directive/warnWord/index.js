import Keyword from "./keyword";
import tools from './tools';

const addWatch = (vm, attrs, expression, instance) => {
  vm.$watch(() => tools.getByPath(vm, expression), () => {
    vm.$nextTick(() => {
      instance.revert();
      instance.run(
        tools.getByPath(vm, attrs.warnWordConfig),
      )
    })
  }, {
    deep: true,
    immediate: true
  });
}
export default {
  inserted(el, binding, vNode) {
    const vm = vNode.context;
    const { attrs } = vNode.data;
    let keywordInstance = new Keyword(el)
    const { expression } = binding;
    if(!expression) {
      addWatch(vm, attrs, attrs.warnWordConfig, keywordInstance)
      return
    };
    addWatch(vm, attrs, expression, keywordInstance)
    el.keywordInstance = keywordInstance;
  },
  unbind(el) {
    el.keywordInstance && el.keywordInstance.revert()
  }
}
