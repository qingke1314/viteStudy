<template>
  <div>
    <div style="color: red;">{{ messageArr }}</div>
    <i class="icon-all primaryColor"></i>
    <el-button type="primary" @click="handleClick">push</el-button>
    <el-button @click="handleChange">change</el-button>
    <el-button @click="handleChangeLanguage">修改语言包</el-button>
    <el-button @click="handleChangeTheme">修改主题</el-button>
    <el-header></el-header>
    <el-main></el-main>
  </div>
</template>
<script>

import { mapActions } from 'vuex';
export default {
  data() {
    return {
      messageArr: [1, 2, 3]
    }
  },
  methods: {
    ...mapActions('configStore', ['changeTheme']),
    handleClick() {
      this.messageArr.push(Math.floor(Math.random() * 100))
    },
    /**
     * 针对数组，使用下标改值不生效，需要使用$set；使用length不生效，需要使用splice等被重写的数组方法
     */
    handleChange() {
      this.$set(this.messageArr, 0, Math.floor(Math.random() * 100)) // 生效
      // this.messageArr[0] = Math.floor(Math.random() * 100) // 不生效
      // this.messageArr.splice(0, 1) // 生效
      // this.messageArr.length = 1 // 不生效
    },
    /**
     * 修改语言包
     */
    handleChangeLanguage() {
      const locale = this.$getLocale() === 'zh' ? 'en' : 'zh';
      this.$setLocale(locale);
    },
    /**
     * 修改主题
     */
    handleChangeTheme() {
      const theme = this.$store.getters['configStore/getConfig'].themeType;
      this.$store.dispatch('configStore/changeTheme', theme === 'red' ? 'normal' :'red')
      // 等价于 this.changeTheme(theme === 'red' ? 'normal' : 'red');
    }
  }
}
</script>