<template>
  <div>
    <div style="color: red;">{{ messageArr }}</div>
    <el-button @click="handleClick">push</el-button>
    <el-button @click="handleChange">change</el-button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      messageArr: [1, 2, 3]
    }
  },
  methods: {
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
    }
  }
}
</script>