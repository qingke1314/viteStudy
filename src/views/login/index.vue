<template>
  <div>
    <img :class="['backImg', fading ? 'backImgActive' : '']" :src="backgroundArr[currentIndex]" alt="" />
    <div class="login">
      <el-form :model="form">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>
<script>
import back1 from '@/assets/images/back1.png';
import back2 from '@/assets/images/back2.png';
import keyInstance from '../../../mockBack/secretKey';

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      backgroundArr: [back1, back2],
      currentIndex: 0,
      turnUpImgTimer: null,
      fading: true
    }
  },
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      this.turnUpImgTimer = setInterval(() => {
        this.fading = false;
        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.backgroundArr.length;
          this.fading = true;
        }, 100);
      }, 5000);
    },
    /**
     * 加密方法
     */
    async encrypt(text) {
      const key = keyInstance.getSecretKey();
      const encoder = new TextEncoder(); // 一个将字符串编码为 Uint8 Array的对象
      const data = encoder.encode(text);
      const keyBuffer = encoder.encode(key);
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw', // 密钥为格式
        keyBuffer, // 密钥数据
        { name: 'AES-CBC' }, // 算法名称
        false, // 不能被导出
        ['encrypt'] // 仅加密
      ); // 通过密钥生成一个加密方法
      const iv = window.crypto.getRandomValues(new Uint8Array(16)); // 生成一个随机的初始向量，作为加密的初始向量，确保安全
      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv },
        cryptoKey,
        data
      ); // 进行加密
      const encryptedArray = new Uint8Array(encrypted); // 转格式
      const encryptedHex = Array.from(encryptedArray).map(byte => byte.toString(16).padStart(2, '0')).join(''); // 转16进制字符串
      const ivHex = Array.from(iv).map(byte => byte.toString(16).padStart(2, '0')).join(''); // 头部添加16进制的初始向量
      return ivHex + encryptedHex;
    },
    async handleLogin() {
      const encryptPSW = await this.encrypt(this.form.password);
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.form.username,
          password: encryptPSW
        })
      })
      const json = await response.json();
      console.log(json, 'json');
    }
  },
  beforeDestroy() {
    clearInterval(this.turnUpImgTimer);
    this.turnUpImgTimer = null;
  }
}
</script>
<style lang="scss" scoped>
.backImg {
  transition: opacity 0.3s ease-out;
  height: 100vh;
  opacity: 0;
  width: 100vw;
  &Active {
    opacity: 1;
  }
}
.login {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 340px;
  background: rgb(0 0 0 / 50%);
  position: absolute;
  z-index: 9;
}
</style>