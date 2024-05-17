<template>
  <div class="editor">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :default-config="toolbarConfig"
        mode="default"
      />
      <Editor
        v-model="valueHtml"
        style="height: 500px; overflow-y: hidden"
        :default-config="editorConfig"
        mode="default"
        @on-created="handleCreated"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { DomEditor, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

useTitle('写文章', { titleTemplate: '%s | Allenice' })
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

const toolbarConfig: Partial<typeof IToolbarConfig> = {
  excludeKeys: ['group-image', 'color'],
}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  nextTick(() => {
    const toolbar = DomEditor.getToolbar(editor)
    const curToolbarConfig = toolbar.getConfig()
    console.log('当前菜单排序和分组', curToolbarConfig.toolbarKeys)
    console.log('所有的菜单key', editor.getAllMenuKeys())
  })
}
</script>
