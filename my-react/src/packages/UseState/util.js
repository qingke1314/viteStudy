import { useRef } from "react";
function usePersistFn(fn) {
  //每次传进来的fn都是新的内容
  const fnRef = useRef(fn);
  // 由于useRef每次刷新不重设值
  // 所以这里多了一步设置current
  fnRef.current = fn;

  const persistFn = useRef();
  // 只有初次会触发true
  if (!persistFn.current) {
    // 只赋值一次，保证指针一直不变
    persistFn.current = function (...args) {
      // fnRef.curret是实时改变的
      // 保证内容是最新的
      return fnRef.current.apply(this, args);
    };
  }

  return persistFn.current;
}
export default usePersistFn