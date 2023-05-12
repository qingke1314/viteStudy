<template>
  <div class="head">
    <div class="head-left">
      <i class="saasicon isaas-bid-clarify"></i>
      <span class="head-left-name">vue-demo</span>
    </div>
    <div class="head-right">
      <span class="head-right-name">{{ userName }}</span>
      <div class="head-right-sculpture"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: '滔滔',
    }
  }
}
</script>
<style scoped lang="scss">
.head {
  background: rgb(87, 147, 155);
  height: 50px;
  display: flex;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    color: white;
    i {
      font-size: 40px;
    }
    &-name {
      margin-left: 10px;
      font-size: 20px;
    }
  }
  &-right {
    display: flex;
    align-items: center;
    &-name {
      color: white
    }
    &-sculpture {
      margin: 0 10px 0 10px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-image: url('../../assets/img/sculpture.jpg');
      background-size: cover;
    }
  }
}
</style>
