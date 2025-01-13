import express from 'express'; // express框架
import jwt from 'jsonwebtoken'; // 引入jwt模块
import secretKeyInstance, { decryptPassword } from './secretKey.js';
import validMap from './validUser.json' assert { type: 'json' };

const server = express();
const secretKey = secretKeyInstance.getSecretKey();

server.use(express.json());
// 模拟登录接口
server.post('/gateway/login', (req, res) => {
  const { username, password } = req.body;
  const decryptPwd = decryptPassword(password);
  // 解密后跟数据库原密码一致
  if (Object.keys(validMap).includes(username) && decryptPwd === validMap[username]) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: '用户名或密码错误' });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

