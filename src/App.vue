<template>
  <div>
    <h1>Hello App!</h1>
		<el-button>测试</el-button>
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
