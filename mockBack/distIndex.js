const express = require('express');

const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '')))

// 定义路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
const port = 1234;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});