<template>
  <section class="box">
    <header class="header">
      <el-button style="marginLeft: 8px;" @click="handleChangeLanguage">修改语言包</el-button>
      <el-button @click="handleChangeTheme">修改主题</el-button>
      <el-button @click="handleLoginOut">退出登录</el-button>
    </header>
    <main class="layout">
      <el-menu
        router
        unique-opened
        :default-active="nowIndex"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        :collapse="getCollapse"
      >
        <div @click="() => setCollapse()" class="collapse">
          <i :class="[getCollapse ? 'icon-outdent' : 'icon-indent', 'primaryColor']"></i>
        </div>
        <deep-menu :menuList="menuList"></deep-menu>
      </el-menu>
      <div class="routerView">
        <router-view></router-view>
      </div>
    </main>
  </section>
</template>
<script>
import Cookie from 'js-cookie';
import { mapGetters, mapMutations } from 'vuex';
import { getMenuList } from '@/service/base';
import deepMenu from './deepMenu.vue';

export default {
  components: {
    deepMenu
  },
  data() {
    return {
      menuList: [],
      nowIndex: this.$route.path
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations('configStore', [
      'setCollapse'
    ]),
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
    handleLoginOut() {
      Cookies.remove('access_token');
      this.$router.push({
        path: '/login'
      })
    },
    /**
     * 修改语言包
     */
    handleChangeLanguage() {
      const locale = this.$getLocale() === 'zh' ? 'en' : 'zh';
      this.$setLocale(locale);
    },
    /**
     * 修改主题
     */
    handleChangeTheme() {
      const theme = this.$store.getters['configStore/getConfig'].themeType;
      this.$store.dispatch('configStore/changeTheme', theme === 'red' ? 'normal' :'red')
      // 等价于 this.changeTheme(theme === 'red' ? 'normal' : 'red');
    }
  },
  watch: {
    $route(to) {
      this.nowIndex = to.path;
    }
  },
  computed: {
    ...mapGetters('configStore', [
      'getCollapse'
    ])
  }
}
</script>
<style scoped lang="scss">
  .box {
    display: flex;
    flex-direction: column;
    .header {
      padding: 10px 10px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      height: 50px;
      background: var(--primaryColor);
    }
  }
  .collapse {
    padding: 10px 20px;
    &:hover {
      cursor: pointer;
    }
  }
  .el-menu-vertical.el-menu--collapse {
    height: calc(100vh - 50px);
    ::v-deep  {
      .el-icon-arrow-right {
        display: none;
      }
      .el-submenu__title {
        span {
          display: none;
        }
      }
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: calc(100vh - 50px);
  }
  .layout {
    padding: 0;
    display: flex;
    .routerView {
      flex: 1;
    }
  }
</style>