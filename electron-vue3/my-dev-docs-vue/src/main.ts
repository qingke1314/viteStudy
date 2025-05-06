import type { IpcRendererEvent } from "electron";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);

app.use(router);

app.mount("#app").$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer?.on(
    "main-process-message",
    (_event: IpcRendererEvent, message: any) => {
      console.log(message);
    }
  );
});

/**
 * 全局子组件错误处理
 */
app.config.errorHandler = err => {
  console.error(err);
}