  /**
   * 简易监听器：dataSet 对象 callback 回调
   * 如dataSet = { a: { b: 1 }, c: 3 },想监听b和c，则callback需要为：
   * { a: { b: { self: fn } }, c: { self: fn } }
  */
  function addWatch(dataSet, callback = {}) {
    if(!dataSet || dataSet === null || typeof dataSet !== 'object') return
    Object.keys(dataSet).forEach(e => {
      addWatch(dataSet[e], callback[e])
      var value = dataSet[e]
      Object.defineProperty(dataSet, e, {
        get() {
          return value
        },
        set(val) {
          value = val
          callback[e] && callback[e].self && callback[e].self()
        }
      })
    })
  }