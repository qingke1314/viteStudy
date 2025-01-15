import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    config: {
      themeType: globalConfig.themeType || 'red'
    },
    collapse: true,
  },
  mutations: {
    setConfig(state, config) {
      state.config = {
        ...state.config,
        ...config
      };
    },
    setCollapse(state, collapse) {
      const to = collapse ?? !state.collapse;
      state.collapse = to;
    }
  },
  actions: {
    /**
     * 更改主题
     */
    changeTheme(state, type) {
      state.commit('setConfig', { themeType: type });
      Vue.prototype.$_changeTheme(type);
    }
  },
  getters: {
    getConfig(state) {
      return state.config;
    },
    getCollapse(state) {
      return state.collapse;
    }
  }
};