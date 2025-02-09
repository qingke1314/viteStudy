function sandBox(code) {
  // 函数体，通过with关键字替换上下文
  code = `with(ctx) { ${code} }`;
  // 沙箱函数sandbox，接收参数ctx(上下文)，执行代码code
  const sandboxFn = new Function('ctx', code);
  // 白名单设置，白名单中的字段可以从全局取
  const whiteList = ['Math'];
  // 返回代理劫持对象，传擦为上下文
  return function(sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      // has可以拦截with代码块中任意属性的访问
      has(target, key) {
        if(whiteList.includes(key)) {
          return true;
        }
        if(target.hasOwnProperty(key)) {
          return true;
        }
        return new Error(`${key} is not defined`);
      },
      get(target, key) {
        return target[key];
      }
    });
    return sandboxFn(sandboxProxy);
  }
}
const test = {
  a: 'a',
  func(value) {
    console.log(value);
  },
  date() {
    console.log(new Date());
  }
}
const var2 = 'var2';
const code = 'func(a); date(); func(var2);'
sandBox(code)(test);