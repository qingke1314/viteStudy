<template>
  <div class="layout">
    <el-menu
      router
      unique-opened
      :default-active="nowIndex"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <deep-menu :menuList="menuList"></deep-menu>
    </el-menu>
    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { getMenuList } from '@/service/base';
import deepMenu from './deepMenu.vue';

export default {
  components: {
    deepMenu
  },
  data() {
    return {
      isCollapse: false,
      menuList: [],
      nowIndex: this.$route.path
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getMenuData();
    },
    getMenuData() {
      getMenuList().then(res => {
        this.menuList = res.data || [];
      })
    },
    handleOpen() {},
    handleClose() {},
  },
  watch: {
    $route(to) {
      this.nowIndex = to.path;
    }
  }
}
</script>
<style scoped lang="scss">
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
  }
  .layout {
    display: flex;
    .routerView {
      flex: 1;
    }
  }
</style>