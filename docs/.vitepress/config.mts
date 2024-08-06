import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Allenice Blog',
    description: '前端开发记录',
    cleanUrls: true,
    rewrites: {
        // engineering/problems/eslint-prettier
        '0000-frontend-engineering/0000-problems/0000-ts-enum-in-vue.md':
            'engineering/problems/ts-enum-in-vue.md',
        // engineering/reference/eslint-prettier
        '0000-frontend-engineering/0005-reference/0000-husky-eslint-prettier-lint-staged.md':
            'engineering/reference/eslint-prettier.md',
        // engineering/reference/path-alias
        '0000-frontend-engineering/0005-reference/0010-path-alias.md':
            'engineering/reference/path-alias.md',
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端基建',
                link: '/engineering/reference/eslint-prettier',
            },
            {
                text: '常见问题',
                link: '/engineering/problems/ts-enum-in-vue',
            },
        ],

        sidebar: {
            '/engineering/problems/': [
                {
                    text: 'vue中使用ts的enum枚举',
                    link: '/engineering/problems/ts-enum-in-vue',
                },
            ],
            '/engineering/reference/': [
                {
                    text: 'eslint-prettier',
                    link: '/engineering/reference/eslint-prettier',
                },
                {
                    text: 'vite、tsconfig、nuxt、pnpm别名设置',
                    link: '/engineering/reference/path-alias',
                },
            ],
        },

        socialLinks: [
            // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ],
    },
    vite: {
        server: {
            port: 8080,
            open: true,
        },
    },
})
