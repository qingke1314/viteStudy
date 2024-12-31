import crypto from 'crypto'; // nodejs内置的加密模块

/**
 * 密钥类，使用单例模式
 */
function SecretKey() {};
SecretKey.prototype.getSecretKey = function() {
  if(!this.secretKey) {
    // this.secretKey = crypto.randomBytes(16).toString('hex');
    // 因为浏览器和nodejs都要用到key，而这里是用nodejs内置模块生成的，在浏览器端第一次使用会报错，所以直接写死
    this.secretKey = 'thisisasecretkey1234567890123456';
  }
  return this.secretKey;
};

const singleSecretKey = new SecretKey();
/**
 * 对密码进行解密
 */
export function decryptPassword(encryptedData) {
  const encryptionKey = singleSecretKey.getSecretKey();
  // 拆分初始向量和加密密码
  const ivHex = encryptedData.slice(0, 32);
  const encryptedHex = encryptedData.slice(32);
  // 转成unit8 Arr格式
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
  // 创建解密器
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encryptedBuffer, 'binary', 'utf8'); // 对后半段加密的密码进行解密
  decrypted += decipher.final('utf8'); // 将多次解密的结果进行拼接
  return decrypted;
}
/**
 * 唯一密钥实例
 */
export default singleSecretKey;
