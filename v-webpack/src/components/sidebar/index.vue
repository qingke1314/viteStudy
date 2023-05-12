<!-- 菜单栏 -->
<template>
  <div class="side-bar">
    <el-menu router :default-active="nowTagValue">
      <div class="header-content">
        <sidebar-item :menus="MENU_JSON"></sidebar-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
import sidebarItem from './sidebar-item.vue'
const MENU_JSON = [
  {
    title: '首页',
    key: 'home',
    path: '/home',
    icon: 'isaas-zuidipingjiafa',
  },
  {
    title: 'JavaScript',
    key: 'JavaScript',
    path: '/java',
    icon: 'isaas-edit-square',
    children: [
      {
        title: '数据类型',
        key: 'dataType',
        path: '/java/dataType',
        icon: 'isaas-card-type',
      },
      {
        title: '方法与事件',
        key: 'methods',
        path: '/java/methods',
        icon: 'isaas-edit1',
      },
    ]
  },
  {
    title: 'Operate',
    key: 'Operate',
    path: '/operate',
    icon: 'isaas-zuidipingjiafa',
    children: [
      {
        title: 'withThis',
        key: 'withThis',
        path: '/operate/withThis',
        icon: 'isaas-right-icon',
      },
      {
        title: 'mark',
        key: 'mark',
        path: '/operate/mark',
        icon: 'isaas-right-icon',
      },
    ]
  }
]
export default {
  components: { sidebarItem },
  data() {
    return {
      nowTagValue: '',
      openedRoute: [],
      MENU_JSON,
    }
  },
  methods: {
  },
  created() {
    this.nowTagValue = this.$route.path;
  },
  watch: {
    $route(value) {
      this.nowTagValue = value.path || value.url;
    }
  }
}
</script>
<style scoped lang='scss'>
/deep/ .el-menu {
  border-right: 0;
}
.side-bar {
  padding: 5px 0;
  height: calc(100% - 16px);
  width: 100%;
  background: white;
  margin: 8px 0;
  border-radius: 5px;
}
</style>
