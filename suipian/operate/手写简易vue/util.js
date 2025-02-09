/**
 * @param {*} context 上下文 此处是vue实例
 * @param {*} exp 属性名，eg:a[b].c.d[e].g
 * @returns selfVue[a][b][c][d][e][g]
 */
export function getByPath(context, exp) {
  if(!context || !exp || typeof exp !== 'string') return;
  const reg = /\.|(?=\[.+\])/;
  const paths = exp.trim().split(reg);
  let _context = context;
  let index = 0;
  while(_context && index < paths.length) {
    let attr = paths[index];
    const quoteAttr = attr.match(/\[(.+)\]/);
    if(quoteAttr) {
      attr = quoteAttr[1];
    }
    _context = _context[attr];
    index++;
  }
  return _context;
}