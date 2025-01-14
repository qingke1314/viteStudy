import express from 'express'; // express框架
import jwt from 'jsonwebtoken'; // 引入jwt模块
import secretKeyInstance, { decryptPassword } from './secretKey.js';
import validMap from './validUser.json' assert { type: 'json' };
import menu from './menu.json' assert { type: 'json' };
const server = express();
const secretKey = secretKeyInstance.getSecretKey();
const validateToken = (token) => {
  let code, message;
  if (!token) {
    code = 401;
    message = 'No token provided.';
    // res.status(403).json({ message: 'No token provided.' });
  } else {
    try {
      jwt.verify(token, secretKey);
      code = 200;
      message = 'This is a protected route.';
      // res.json({ message: 'This is a protected route.' });
    } catch (err) {
      code = 403;
      message = 'Invalid token.';
      // res.status(401).json({ message: 'Invalid token.' });
    }
  }
  return {
    code,
    message
  };
}
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

// 模拟获取菜单接口
server.post('/gateway/getMenu', (req, res) => {
  const token = req.headers.access_token;
  const { code, message } = validateToken(token);
  if (code === 200) {
    res.json({ success: true, code, message, data: menu });
  } else {
    res.status(code).json({ success: false, code, message });
  }
});
const port = 3000;
server.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

