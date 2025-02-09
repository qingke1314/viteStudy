~ function () {
  function myIndexOf(searchStr) {
      // 这个也可以正则实现 下面代码
      // let reg = new RegExp(searchStr)
      // res = reg.exec(this)
      // return res === null ? -1 : res.index

      let len = this.length
      let searchLen=searchStr.length
      if (searchLen > len) return -1
      // 如果输入的字符串大于要检测的字符串直接 -1
      for (var i = 0; i <= len-searchLen; i++) {
          if (this.substring(i,searchLen+i) === searchStr) {
              return i
          }
      }
      return -1
  }
  String.prototype.myIndexOf = myIndexOf
}()
let str = 'dwanlghMappaw'
let searchStr= 'hM'
console.log(str.myIndexOf(searchStr));