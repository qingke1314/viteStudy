<template>
  <div>
    <div v-if="editor" class="editor">
      <div class="editor-menu">
        <button
          @click="handleEdit('bold', editor)"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          粗体
        </button>
        <button
          @click="handleEdit('italic', editor)"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          斜体
        </button>
        <button
          @click="handleEdit('h1', editor)"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="handleEdit('h2', editor)"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
      </div>
      <editor-content class="editor-content" :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: "创意管理", // 初始 HTML 内容
  autofocus: false,
  editorProps: {
    // 新增这一部分
    attributes: {
      style: "outline: none;", // 直接移除 outline
    },
  },
  extensions: [
    StarterKit,
    Link,
    // 根据需要添加其他扩展（例如，“link”、“image”）
  ],
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML()); // 向父组件发出 HTML 内容
  },
});

const props = defineProps({
  modelValue: String, // 为了支持 v-model
});

const handleEdit = (type, editor) => {
  switch (type) {
    case "bold":
      editor.chain().focus().toggleBold().run();
      break;
    case "italic":
      editor.chain().focus().toggleItalic().run();
      break;
    case "h1":
      editor.chain().focus().toggleHeading({ level: 1 }).run();
      break;
    case "h2":
      editor.chain().focus().toggleHeading({ level: 2 }).run();
      break;
    default:
      break;
  }
};

onMounted(() => {
  if (editor.value && props.modelValue) {
    editor.value.commands.setContent(props.modelValue);
  }
});

onBeforeUnmount(() => {
  editor.value.destroy(); // 清理编辑器实例
});
</script>

<style scoped>
.editor {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.editor-menu {
  padding: 8px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

.editor-content {
  padding: 12px;
  min-height: 200px;
  background-color: white;
}

.editor-menu button {
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
}

.editor-menu button.is-active {
  background-color: #e0e0e0;
}
</style>
