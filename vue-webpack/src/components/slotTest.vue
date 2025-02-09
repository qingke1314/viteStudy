<!-- app.vue -->
<template>
  <div>
    <bb>
      <template v-slot:header="user">
        {{user}}
      </template>
    </bb>
  </div>
</template>
<script>
import bb from './bb.vue'
export default {
  name: "app",
  components: {
    bb
  }
};
</script>

<template>
  <!-- bb.vue -->
  <div>
    <slot name="header" :user="user"></slot>
  </div>
</template>
<script>
export default {
  name: 'bb',
  data() {
    return {
      user: 'your TT'
    }
  },
  methods: {
    renderSlot() {
      var render = function render() {
      var _vm = this, _c = _vm._self._c;
      return _c("div", [
        _c("bb", {
          scopedSlots: _vm._u([{
            key: "header",
            fn: function (user) {
              return [ _vm._v("\n      " + _vm._s(user) + "\n    ") ]
            },
          }]),
        })], 1);
      }
    },
    // _u
    resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) { // the following are added in 2.6: hasDynamicKeys, contentHashKey
      res = res || { $stable: !hasDynamicKeys };
      for(var i = 0; i < fns.length; i++) {
        var slot = fns[i];
        if(isArray(slot)) {
          resolveScopedSlots(slot, res, hasDynamicKeys);
        } else if(slot) {
          // marker for reverse proxying v-slot without scope on this.$slots
          // @ts-expect-error
          if (slot.proxy) {
            // @ts-expect-error
            slot.fn.proxy = true;
          }
          res[slot.key] = slot.fn;
        }
      }
      if (contentHashKey) {
        res.$key = contentHashKey;
      }
      return res; // { $stable: !hasDynamicKeys, header: [ _vm._v() ] }
    },
    //
    initRender(vm) {
      for (var key_1 in scopedSlots) {
        if (scopedSlots[key_1] && key_1[0] !== '$') {
          res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
        }
      }
    },
    normalizeScopedSlot(vm, normalSlots, key, fn) { // fn: function (user) { return [ _vm._v("\n      " + _vm._s(user) + "\n    ") ] },
      var normalized = function () {
        var cur = currentInstance;
        setCurrentInstance(vm);
        var res = arguments.length ? fn.apply(null, arguments) : fn({});
        res = res && typeof res === 'object' && !isArray(res) ? [res] : normalizeChildren(res);
        var vnode = res && res[0];
        setCurrentInstance(cur);
        return res &&
          (!vnode || (res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode))) // #9658, #10391
          ? undefined : res;
      };
      // this is a slot using the new v-slot syntax without scope. although it is
      // compiled as a scoped slot, render fn users would expect it to be present
      // on this.$slots because the usage is semantically a normal slot.
      if (fn.proxy) {
        Object.defineProperty(normalSlots, key, {
          get: normalized,
          enumerable: true,
          configurable: true
        });
      }
      return normalized;
    },
    // _t
    renderSlot(name, fallbackRender, props, bindObject) {
      var scopedSlotFn = this.$scopedSlots[name];
      var nodes;
      if (scopedSlotFn) {
        // scoped slot
        props = props || {};
        if (bindObject) {
          if (!isObject(bindObject)) {
            warn$2('slot v-bind without argument expects an Object', this);
          }
          props = extend(extend({}, bindObject), props);
        }
        nodes = scopedSlotFn(props) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
      } else {
        nodes = this.$slots[name] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
      }
      var target = props && props.slot;
      if (target) {
        return this.$createElement('template', { slot: target }, nodes);
      }
      else { return nodes }
    },
  }
}
</script>
