<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import baseLayout from './components/baseLayout.vue'
export default {
  name: 'App',
  components: { baseLayout }
}
</script>

<style lang='scss'>
</style>
