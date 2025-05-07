<template>
  <el-container class="common-layout">
    <el-header class="common-header"></el-header>
    <el-container>
      <el-aside width="200px" class="common-aside">
        <side-menu :menu-items="menuConfig" />
      </el-aside>
      <el-main class="common-main">
        <router-view />
      </el-main>
    </el-container>
    <el-footer class="common-footer">Footer</el-footer>
  </el-container>
</template>

<script setup>
import SideMenu from "./SideMenu.vue";

// 假设 menuConfig 会从父组件传入，或者从 store 中获取
//  为了演示，这里定义一个示例配置
// 在实际应用中，你应该从外部传入或在更高级别的地方定义
const menuConfig = [
  {
    name: "首页",
    path: "/",
    // icon: 'HomeFilled' // 假设你已经全局注册了 Element Plus 图标
  },
  {
    name: "日志管理",
    path: "/logs",
    // icon: 'Document'
  },
  {
    name: "错题集",
    // path: '/errors', // 父菜单可以没有path，如果它仅用于展开
    // icon: 'CollectionTag',
    children: [
      {
        name: "前端错题",
        path: "/errors/frontend",
        // icon: 'Tickets'
      },
      {
        name: "后端错题",
        path: "/errors/backend",
        // icon: 'DataLine'
      },
    ],
  },
  {
    name: "配置项",
    path: "/configurations",
    // icon: 'Setting'
  },
  {
    name: "总结回顾",
    path: "/summary",
    // icon: 'Memo'
  },
];

// 如果你需要从父组件接收 menuConfig，则使用 defineProps
// import { defineProps } from 'vue';
// defineProps({
//   menuConfig: {
//     type: Array,
//     required: true
//   }
// });
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .common-header {
    background-color: var(--el-color-primary-light-7);
    // 添加一些内边距和文本样式，使其看起来更像页眉
    padding: 0 20px;
    display: flex;
    align-items: center;
    color: var(--el-text-color-primary);
  }
  .common-aside {
    background-color: var(--el-color-primary-light-9);
    // 确保侧边栏内容不会溢出，如果菜单很长，可以考虑滚动条
    overflow-y: auto;
  }
  .common-main {
    padding: 20px; // 给主内容区一些内边距
    background-color: var(--el-bg-color-page);
  }
  .common-footer {
    background-color: var(--el-color-info-light-7);
    // 添加一些内边距和文本样式
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-regular);
    height: 40px; // 定义一个合适的高度
    line-height: 40px;
  }
}
</style>
