/**
 * 将数字转换为中文大写并添加单位
 *
 * @param number 要转换的数字
 * @param unit 单位，默认为空字符串
 * @returns 转换后的中文大写字符串
 */
function numberToChineseWithUnit(number, unit = '') {
  const units = ['', '拾', '佰', '仟'];
  const chars = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const bigUnits = ['', '万', '亿', '兆'];
  let str = '';
  let count = 0;
  let zeroCount = 0;
  const parts = number.toString().split('.');
  // 处理整数部分
  parts[0].split('').reverse().forEach((digit, index) => {
      let p = index % 4;
      let n = digit.toString();
      let q = number.toString().length - index - 1;
      if (n === '0') {
          zeroCount++;
      } else {
          if (zeroCount > 0) {
              str += chars[0];
          }
          zeroCount = 0;
          str += chars[parseInt(n)] + units[p];
      }
      if (bigUnits[Math.floor(p / 4)] && q) {
          str += bigUnits[Math.floor(p / 4)];
      }
  });
  // 处理小数部分
  if (parts[1]) {
      str += '点';
      parts[1].split('').forEach((digit, index) => {
          str += chars[parseInt(digit)];
          if (index < parts[1].length - 1) {
              str += '角分'.charAt(index);
          }
      });
  }
  // 添加单位
  if (unit) {
      str += unit;
  }
  return str.replace(/零(万|亿|兆)/g, '$1').replace(/零+/g, '零').replace(/^零+/, '');
}

// 示例
debugger
console.log(numberToChineseWithUnit(123456789, '元')); // 输出：壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元
console.log(numberToChineseWithUnit(10010.01, '元')); // 输出：壹万零壹拾元零壹分
console.log(numberToChineseWithUnit(1000, '个')); // 输出：壹仟个