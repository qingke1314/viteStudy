<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    router
    @select="handleSelect"
  >
    <template v-for="item in menuItems" :key="item.path || item.name">
      <el-sub-menu
        v-if="item.children && item.children.length > 0"
        :index="item.path || item.name"
      >
        <template #title>
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <side-menu-item :items="item.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
// A recursive component for sub-menu items
const SideMenuItem = {
  name: "SideMenuItem",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  template: `
    <template v-for="subItem in items" :key="subItem.path || subItem.name">
      <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path || subItem.name">
        <template #title>
          <el-icon v-if="subItem.icon"><component :is="subItem.icon" /></el-icon>
          <span>{{ subItem.name }}</span>
        </template>
        <side-menu-item :items="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path">
        <el-icon v-if="subItem.icon"><component :is="subItem.icon" /></el-icon>
        <template #title>{{ subItem.name }}</template>
      </el-menu-item>
    </template>
  `,
};

defineProps({
  menuItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const route = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

const handleSelect = (index, indexPath, item, routeResult) => {
  console.log("Menu selected:", index, indexPath, item, routeResult);
  // Navigation is handled by the 'router' prop on el-menu
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%; /* Ensure menu takes full height of its container */
}
.el-menu {
  border-right: none; /* Remove default border if not desired */
}
</style>
