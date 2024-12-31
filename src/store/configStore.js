import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    config: {
      themeType: globalConfig.themeType || 'red'
    }
  },
  mutations: {
    setConfig(state, config) {
      state.config = {
        ...state.config,
        ...config
      };
    },
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
    }
  }
};