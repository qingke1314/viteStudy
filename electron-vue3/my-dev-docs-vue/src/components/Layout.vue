<template>
  <div class="layout">
    <el-button>测试element</el-button>
    <nav>
      <ul>
        <li><router-link to="/logs">日志</router-link></li>
        <li><router-link to="/errors">错题集</router-link></li>
        <li><router-link to="/configs">配置</router-link></li>
        <li><router-link to="/summaries">总结</router-link></li>
      </ul>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>

</style>
