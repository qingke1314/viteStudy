import './style.css';
import Icon from './assets/img/vueLifeCircle.png';
import { numToWord } from 'webpack-tstlibrary';
async function getComponent() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }
  const { default: lodash } = await import(/* webpackPrefetch: true */'lodash'); // 预获取(闲置时加载，父chunk加载完加载)、预加载(跟父chunk一起加载，中等优先级)
  const element = document.createElement('div');
  element.innerHTML = lodash.join(['Hello', 'webpack'], ' ');
  // 添加类
  element.classList.add('hello');
  // 添加图片
  const myPic = new Image();
  myPic.src = Icon;
  element.appendChild(myPic);
  const btn = document.createElement('button');
  btn.innerHTML = numToWord(2);
  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default; // 使用import()加载，必须使用.default值，它才是promise被处理后的返回
    print();
  });
  element.appendChild(btn);
  return element;
}
getComponent().then((component) => {
  document.body.appendChild(component);
})
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('aAccepting the updated printMe module!');
    printMe();
  })
}