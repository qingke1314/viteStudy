<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <layout />
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import Layout from "./components/Layout.vue";

export default defineComponent({
  components: {
    ElConfigProvider,
    Layout,
  },
  setup() {
    return {
      zIndex: 3000,
      size: "small",
    };
  },
});
</script>
