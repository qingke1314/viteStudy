<template>
  <div>
    <el-button v-if="false"></el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
