<template>
  <div class="article-container">
    <div class="flex justify-center h-full">
      <v-card class="!p-[20px]" width="820px">
        <h1 class="text-[24px] text-center">{{ title }}</h1>
        <Viewer :value="content" :plugins="plugins" />
      </v-card>
      <v-expansion-panels v-model="panelExpanded" multiple class="ml-[20px] !w-[300px] h-fit">
        <v-expansion-panel title="目录" class="!h-[300px]" value="目录">
          <template #text>
            <ul>
              <li v-for="(item, index) in catalogue" :key="index">
                <a href="" class="block">{{ item.text }}</a>
              </li>
            </ul>
          </template>
        </v-expansion-panel>
        <v-expansion-panel title="目录1" class="!h-[300px]" value="目录1">
          <template #text>
            <ul>
              <li v-for="(item, index) in catalogue" :key="index">
                <a href="" class="block">{{ item.text }}</a>
              </li>
            </ul>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Viewer } from '@bytemd/vue-next'
import { ref } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import emoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import zoom from '@bytemd/plugin-medium-zoom'
import { getProcessor } from 'bytemd'

const plugins = [
  zoom(),
  math({
    katexOptions: {
      output: 'mathml',
    },
  }),
  gfm({}),
  breaks(),
  frontmatter(),
  emoji(),
  highlight(),
]

const panelExpanded = ref(['目录'])
const title = ref('')
const content = ref('')
const catalogue = ref<ICatalogueItem[]>([])
type ICatalogueItem = {
  level: number
  text: string
}
const articleId = useRoute().params.id
fetch(`/api/articles/${articleId}`).then(async (res) => {
  const reader = await res.json()
  title.value = reader.title
  content.value = reader.content
  type INode = { type: string; tagName: string; value: string; children?: INode[] }
  getProcessor({
    plugins: [
      {
        rehype: (p) =>
          p.use(() => (tree: INode) => {
            const nodeList = tree.children!
            if (nodeList && nodeList.length) {
              for (let i = 0; i < nodeList.length; i++) {
                if (
                  nodeList[i].type === 'element' &&
                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(nodeList[i].tagName)
                ) {
                  catalogue.value.push({
                    level: Number(nodeList[i].tagName[1]),
                    text: nodeList[i].children![0].value,
                  })
                }
              }
            }
          }),
      },
    ],
  }).processSync(reader.content)
})
</script>
<style scoped lang="less">
.article-container {
  padding: 10px 50px;
  margin: 0 auto;
}
</style>
