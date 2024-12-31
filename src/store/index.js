import Vue from 'vue';
import VueX from 'vuex';
import configStore from './configStore';

Vue.use(VueX);
export default new VueX.Store({
  modules: {
    configStore,
    otherStore: {
      state: {
        count: 0
      },
      mutations: {
        add(state) {
          state.count++;
        }
      },
      getters: {
        getCount(state) {
          return state.count;
        }
      }
    }
  }
});