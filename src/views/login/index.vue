<template>
  <div class="content">
    <img :class="['backImg', fading ? 'backImgActive' : '']" :src="backgroundArr[currentIndex]" alt="" />
    <div class="login">
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input @keyup.enter.native="handleLoginAndTo" v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="width: 120px; margin-left: 140px;" @click="handleLoginAndTo">登录</el-button>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
import back2 from '@/assets/images/back2.png';
import back3 from '@/assets/images/back3.png';
import keyInstance from '../../../mockBack/secretKey';
import { handleLogin } from '@/service/base';

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      backgroundArr: [back2, back3],
      currentIndex: 0,
      turnUpImgTimer: null,
      fading: true,
      rules: {
        username: [
          { required: true, message: '请填写', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请填写', trigger: 'change' }
        ],
      }
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
    handleLoginAndTo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const encryptPSW = await this.encrypt(this.form.password);
          const loading = this.$loading();
          handleLogin({
            username: this.form.username,
            password: encryptPSW
          })
            .then(res => {
              if(res.success) {
                this.$message({
                  type: 'success',
                  message: '登陆成功!'
                });
                Cookies.set('access_token', res.token);
                this.$router.push('/home');
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            })
            .finally(() => { loading.close(); })
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.turnUpImgTimer);
    this.turnUpImgTimer = null;
  }
}
</script>
<style lang="scss" scoped>
.content {
  height: 100vh;
  background: radial-gradient(circle,rgb(0, 255, 42), rgb(95, 168, 216, 0.5), rgb(156, 79, 156, 0.5));
}
.backImg {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transform: translateX(-50%);
  left: 50%;
  top: 10vh;
  position: relative;
  transition: opacity 0.3s ease-out;
  height: 80vh;
  opacity: 0;
  border-radius: 50%;
  width: 80vh;
  &Active {
    opacity: 1;
  }
}
.login {
  padding: 40px 60px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 140px;
  background: rgb(0 0 0 / 30%);
  position: absolute;
  z-index: 9;
}
</style>