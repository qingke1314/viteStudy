<template>
  <div class="content">
    <div v-show="hasInit" class="editor-container">
      <RichTextEditor
        v-model="editorContent"
        :init="customInitOptions"
        @change="onEditorChange"
        @onInit="onEditorInit"
      />
    </div>
    <div class="tool">
      <el-button type="primary" @click="handlePublish">发布</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RichTextEditor from './RichTextEditor.vue'; // 导入你封装的组件

const editorContent = ref('');
const hasInit = ref(false);

// 可以传入自定义的 init 配置，会和组件内部的默认配置合并
const customInitOptions = {
  // 添加其他 TinyMCE 配置...
};

// 处理编辑器内容变化的事件
const onEditorChange = (content, event) => {
  console.log('编辑器内容变化了:', content);
  // console.log('原生事件对象:', event);
};

// 处理编辑器初始化完成的事件
const onEditorInit = (editor) => {
  hasInit.value = true;
  console.log('编辑器初始化完成了:', editor);
  // 可以在这里访问 editor 实例进行一些操作
  // editor.setContent('<p>初始化后设置的内容</p>');
};

const handlePublish = () => {
  console.log('发布');
};
</script>

<style scoped>
.content {
  background-color: var(--el-bg-color);
  height: calc(100% - 16px);
  padding: 8px;
}
.tool {
  margin-top: 8px;
  text-align: right;
}
.editor-container {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
