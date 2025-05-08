
// 1. 引入依赖
const express = require('express');
const mysql = require('mysql2');

// 2. 创建 Express 应用
const app = express();
const port = process.env.PORT || 3000; // 使用环境变量的端口或默认3000

// 3. 中间件配置
app.use(express.json()); // 用于解析请求体中的 JSON 数据

// 4. MySQL 数据库连接配置
const dbConfig = {
  host:    'localhost',        // 数据库主机名，通常是 localhost
  user: 'blog_user',        // 您创建的 MySQL 用户名
  password: 'your_strong_password', // 您为该用户设置的密码
  database: 'my_blog_db'    // 您创建的数据库名
};

// 创建数据库连接池 (更推荐用于生产环境，能更好管理连接)
const pool = mysql.createPool(dbConfig);

// 测试数据库连接 (可选，但推荐)
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.stack);
    // 根据错误类型可以决定是否退出应用
    // 例如：如果是 ECONNREFUSED (连接被拒绝)，可能是 MySQL 服务没启动
    // 如果是 ER_ACCESS_DENIED_ERROR (访问被拒绝)，可能是用户名或密码错误
    // 如果是 ER_BAD_DB_ERROR (数据库不存在)，可能是 database 配置错误
    process.exit(1); // 严重错误，退出应用
    return;
  }
  console.log('Successfully connected to MySQL database as ID ' + connection.threadId);
  connection.release(); // 释放连接回连接池
});


// (稍后我们会在这里创建表)

// 5. 定义 API 路由

// 示例：获取所有文章
app.get('/api/posts', (req, res) => {
  const sql = 'SELECT * FROM posts ORDER BY created_at DESC'; // 假设有个 posts 表和 created_at 字段
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
    }
    res.json(results);
  });
});

// 示例：创建一篇新文章
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body; // 从请求体中获取数据

  // 简单的输入验证
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = { title, content, author: author || 'Anonymous' }; // 如果没有作者，默认为 'Anonymous'
  const sql = 'INSERT INTO posts SET ?'; // 使用 ? 作为占位符可以防止 SQL 注入

  pool.query(sql, newPost, (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      return res.status(500).json({ error: 'Failed to create post', details: err.message });
    }
    // result.insertId 包含新插入行的 ID
    res.status(201).json({ id: result.insertId, ...newPost });
  });
});

// 示例：获取单篇文章
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const sql = 'SELECT * FROM posts WHERE id = ?';

  pool.query(sql, [postId], (err, results) => {
    if (err) {
      console.error(`Error fetching post with id ${postId}:`, err);
      return res.status(500).json({ error: 'Failed to fetch post', details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(results[0]);
  });
});

// 6. 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// 优雅地关闭连接池 (可选，但在某些场景下有用)
process.on('SIGINT', () => {
  console.log('Closing MySQL connection pool...');
  pool.end(err => {
    if (err) {
      console.error('Error closing connection pool', err);
    }
    console.log('MySQL connection pool closed.');
    process.exit(0);
  });
});