import DefaultLayout from '@/layout/default.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 动态字段以冒号开始
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/editor-byte',
    children: [
      {
        path: '/editor',
        component: () => import('@/pages/editor/index.vue'),
      },
      {
        path: '/editor-byte',
        component: () => import('@/pages/editor-byte/index.vue'),
      },
      {
        path: '/regist',
        component: () => import('@/pages/regist/index.vue'),
      },
      {
        path: '/article/:id',
        component: () => import('@/pages/article/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
