class Depends {
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    if(!this.deps.includes(dep)) {
      this.deps.push(dep);
    }
  }
  deleteDep(dep) {
    const index = this.deps.findIndex(e => e === dep);
    if(index !== -1) {
      this.deps.split(index, 1);
    }
  }
  notify() {
    this.deps.forEach(e => {
      if(e && typeof e.run === 'function') {
        e.run();
      }
    })
  }
}
export default Depends;