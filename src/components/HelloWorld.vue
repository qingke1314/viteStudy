<template>
  <div style="padding: 12px;">
    <i class="icon-all primaryColor"></i>
    <el-button>push</el-button>
    <el-button @click="handleChange">change</el-button>
    <el-header></el-header>
    <el-main>
      <div>1234</div>
      <el-button>saaS</el-button>
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-tabs>
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-main>
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
  }
}
</script>