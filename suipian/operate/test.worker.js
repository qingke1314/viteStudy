setInterval(() => {
  let num = 0;
  for(let i = 0; i < 5; i++){
    num = (i + 3) * 99 - 457 * 345 + 154 * i;
    self.postMessage(num);
  }
}, 3000)