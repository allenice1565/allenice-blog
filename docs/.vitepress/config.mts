import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Allenice Blog',
    description: '前端开发记录',
    cleanUrls: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端工程化',
                link: '/frontend-engineering/husky-eslint-prettier-lint-staged',
            },
            { text: 'api-examples', link: '/api-examples' },
            { text: 'markdown-examples', link: '/markdown-examples' },
        ],

        sidebar: {
            '/frontend-engineering/': [
                {
                    text: 'husky-eslint-prettier',
                    link: '/frontend-engineering/husky-eslint-prettier-lint-staged',
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
