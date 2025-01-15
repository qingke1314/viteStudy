import Vue from 'vue';
import {
  MessageBox,
  Message,
  Notification,
  Loading
} from 'element-ui';
import '@/theme/message.css';
import '@/theme/message-box.css';
import '@/theme/loading.css';
import '@/theme/notification.css';
import '@/theme/tooltip.css';
/**
 * 这些是方法类，手动按需引入
 */
Vue.prototype.$loading = (options = {}) => {
  return Loading.service({
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.1)',
    ...options,
  });
};
Vue.prototype.$msgBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;