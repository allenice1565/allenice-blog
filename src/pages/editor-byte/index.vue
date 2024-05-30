<template>
  <div class="bytemd-container">
    <div class="header">
      <v-text-field
        v-model:model-value="title"
        bg-color="#fff"
        base-color="#fff"
        placeholder="输入文章标题..."
        variant="plain"
      />
      <v-btn base-color="#1d7dfa">发布</v-btn>
    </div>
    <Editor
      class="bytemd-editor"
      :value="value"
      :plugins="plugins"
      :locale="EditorLocale"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import emoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import zoom from '@bytemd/plugin-medium-zoom'
import { Editor } from '@bytemd/vue-next'
import EditorLocale from 'bytemd/locales/zh_Hans.json'
import MathLocale from '@bytemd/plugin-math/locales/zh_Hans.json'
import GfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json'
import { ref } from 'vue'

const plugins = [
  zoom(),
  math({
    locale: MathLocale,
    katexOptions: {
      output: 'mathml',
    },
  }),
  gfm({
    locale: GfmLocale,
  }),
  breaks(),
  frontmatter(),
  emoji(),
  highlight(),
]
const title = ref('')
const value = ref('')
const handleChange = (v: string) => {
  value.value = v
}
</script>
<style scoped lang="less">
.bytemd-container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    padding: 0 27px;
    display: flex;
    align-items: center;

    :deep(.v-text-field) {
      margin-right: 40px;

      input {
        font-size: 24px;
      }
    }
  }

  .bytemd-editor {
    min-height: 0;
    flex: 1;

    :deep(.bytemd) {
      height: 100%;
    }
  }
}
</style>
