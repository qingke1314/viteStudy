<template>
  <div>
    <template v-for="e in menuList">
      <el-submenu
        popper-append-to-body
        v-if="e.children && e.children.length"
        :key="e.path"
        :index="e.path"
        :title="e.label"
      >
        <template slot="title">
          <i style="marginRight: 8px" :class="[e.icon, 'primaryColor']"></i>
          <span slot="title">{{ e.label }}</span>
        </template>
        <deep-menu :menuList="e.children"></deep-menu>
      </el-submenu>
      <el-menu-item
        v-else
        :key="e.path"
        :index="e.path || e.url||''"
        :title="e.label"
      >
        <i style="marginRight: 8px" :class="[e.icon, 'primaryColor']"></i>
        <span slot="title">{{ e.label }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'deepMenu',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
}
</script>
<style scoped lang="scss">
</style>