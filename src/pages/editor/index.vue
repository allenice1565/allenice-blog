<template>
  <div class="editor">
    <div style="border: 1px solid #ccc">
      <div class="toolbar flex items-center justify-between border-b border-gray-500">
        <Toolbar
          class="hidden sm:block"
          :editor="editorRef"
          :default-config="toolbarConfig"
          mode="default"
        />
        <div class="ml-auto toolbar-extra pl-[3px] pr-[5px]">
          <v-icon
            class="cursor-pointer !w-[32px] !h-[32px] px-[8px] hover:bg-[#f1f1f1]"
            :icon="mdiBookOpenOutline"
            color="#595959"
            size="medium"
          ></v-icon>
          <v-icon
            class="cursor-pointer !w-[32px] !h-[32px] px-[8px] hover:bg-[#f1f1f1]"
            :icon="mdiHelpBoxOutline"
            color="#595959"
            size="medium"
            @click="switchPreview"
          ></v-icon>
        </div>
      </div>
      <div class="editor">
        <Editor
          v-model="valueHtml"
          style="height: 500px; overflow-y: hidden"
          :default-config="editorConfig"
          mode="default"
          @on-created="handleCreated"
          @on-change="handleChange"
        />
        <div ref="previewRef" class="editor-preview"></div>
        <div class="editor-sidebar"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { Boot, DomEditor, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import formulaModule from '@wangeditor/plugin-formula'
import { mdiBookOpenOutline, mdiHelpBoxOutline } from '@mdi/js'

useTitle('写文章', { titleTemplate: '%s | Allenice' })
Boot.registerModule(formulaModule)

type IEditor = typeof DomEditor

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const previewRef = ref()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')
const previewVisible = ref(true)
// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

const toolbarConfig: Partial<typeof IToolbarConfig> = {
  toolbarKeys: [
    'headerSelect',
    'bold',
    'italic',
    'blockquote',
    'insertLink',
    'insertImage',
    'code',
    'codeBlock',
    'bulletedList',
    'numberedList',
    'through',
    'todo',
    'insertTable',
    {
      key: 'group-justify',
      title: '对齐',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
      menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
    },
    'insertFormula',
    'divider',
    'emotion',
  ],
}
const editorConfig = {
  placeholder: '请输入内容...',
  hoverbarKeys: {
    formula: {
      menuKeys: ['editFormula'], // “编辑公式”菜单
    },
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: IEditor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  nextTick(() => {
    const toolbar = DomEditor.getToolbar(editor)
    const curToolbarConfig = toolbar.getConfig()
    console.log('当前菜单排序和分组', curToolbarConfig.toolbarKeys)
    console.log('所有的菜单key', editor.getAllMenuKeys())
  })
}
const handleChange = (val: IEditor) => {
  previewRef.value.innerHTML = val.getHtml()
}
const switchPreview = () => {
  previewVisible.value = !previewVisible.value
}
</script>
