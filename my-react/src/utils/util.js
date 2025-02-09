/**
 * @param {*} fn 需要多次执行的函数
 * @returns 帮忙存取缓存值的函数，参数为键值
 */
export function cached(fn) {
  var cache = Object.create(null);
  return (function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * 连字符转化驼峰(且缓存，避免多次执行) eg: v-model -> vModel
 */
var camelizeRE = /-(\w)/g;
export const camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
    })
});

/**
 * 驼峰转连字符
 * \B的用法 \B是非单词分界符，即可以查出是否包含某个字，如“ABCDEFGHIJK”中是否包含“BCDEFGHIJK”这个字。
 */
  var hyphenateRE = /\B([A-Z])/g;
  export const hyphenate = cached(function (str) {
      return str.replace(hyphenateRE, '-$1').toLowerCase();
  });

/**
 * bind垫片
 * @param {*} fn 改this的函数
 * @param {*} ctx this
 * @returns 改好的函数
 */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l
      ? l > 1
      ? fn.apply(ctx, arguments)
      : fn.call(ctx, a)
      : fn.call(ctx)
  }
  boundFn._length = fn.length;
  return boundFn;
}
function nativeBind(fn, ctx) {
  return fn.bind(ctx)
}
// bind 兼容
export const bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 * 将可迭代对象转换成真的数组
 */
export function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * 对象浅拷贝
 * @param {Object} to
 * @param {Object} from
 */
export function extend(to, from) {
  for(var key in from) {
    to[key] = from[key];
  }
  return to;
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj) {
  //判断是否是对象
  return _toString.call(obj) === '[object Object]'
}

function isRegExp(v) {
  //判断是否是正则对象
  return _toString.call(v) === '[object RegExp]'
}

/**
* Check if val is a valid array index.
* 检查VAL是否是有效的数组索引。
*/
export function isValidArrayIndex(val) {
  //Math.floor 向下取整
  var n = parseFloat(String(val));
  //isFinite 如果 number 是有限数字（或可转换为有限数字），那么返回 true。否则，如果 number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false。
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
* Convert a value to a string that is actually rendered.
*/
export function toString(val) {
  return val == null
    ? ''
    : typeof val === 'object'
    ? JSON.stringify(val, null, 2)
    : String(val)
}

/**
* Convert a input value to a number for persistence.
* If the conversion fails, return original string.
*/
export function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Ensure a function is called only once.
 *  确保该函数只调用一次 闭包函数
 */
export function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

/**
 * Check if a string starts with $ or _
 * 检查一个字符串是否以$或者_开头
 */
export function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 * 用defineProperty 定义属性
 * 详细地址 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  第一个参数是对象
  第二个是key
  第三个是vue
  第四个是 是否可以枚举
  */
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val, //值
    enumerable: !!enumerable,  //定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
    writable: true, //可以 改写 value
    configurable: true  //configurable特性表示对象的属性是否可以被删除，以及除writable特性外的其他特性是否可以被修改。
  });
}