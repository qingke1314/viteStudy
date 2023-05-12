<template>
  <div class="home">
    home
  </div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style lang="scss" scoped>
.home {
  height: calc(100% - 16px);
  width: 100%;
  background: white;
  margin: 8px 0;
  border-radius: 5px;
}
.home::after {
  clear: both;
  content: '';
}
</style>
