<template>
  <div class="sidebar-item">
    <template v-for="menuItem in menus">
      <el-menu-item
        class="menu-item"
        :key="menuItem.key"
        :title="menuItem.title"
        :index="menuItem.path || ''"
        @click="handleMenuClick(menuItem)"
        v-if="!menuItem.children || menuItem.children.length === 0">
        <span slot="title">
          <i :class="`saasicon ${menuItem.icon}`"></i>{{ menuItem.title }}</span>
      </el-menu-item>
      <el-submenu :index="menuItem.path || ''" :key="menuItem.key" :title="menuItem.title" v-else>
        <template slot="title">
          <i :class="`saasicon ${menuItem.icon}`"></i>{{ menuItem.title }}</template>
        <sidebar-item :menus="menuItem.children"></sidebar-item>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    menus: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleMenuClick(menuItem) {
      // this.$router.push(menuItem.path)
    }
  }
}
</script>
<style lang="scss" scoped>
  i {
    color: #57939b;
    margin-right: 5px;
  }
</style>
