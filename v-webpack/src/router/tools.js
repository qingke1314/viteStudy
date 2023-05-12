let anonymousNameCounts = 1
export default {
  /**
   * 组件懒加载
   * @param {*} file 组件位置
   * @returns 组件
   */
  dynamicImport(file) {
    return resolve => require([`../${file}.vue`], (component) => {
      if(!component.name) {
        component.name = `Anonymous_import_${anonymousNameCounts++}`
      }
      resolve(component)
    })
  }
}
