import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Allenice Blog',
    description: '前端开发记录',
    cleanUrls: true,
    rewrites: {
        // engineering/eslint-prettier
        '0000-frontend-engineering/0000-husky-eslint-prettier-lint-staged.md':
            'engineering/eslint-prettier.md',
        // /engineering/pnpm-alia
        '0000-frontend-engineering/0005-pnpm-alia.md':
            'engineering/pnpm-alia.md',
        // engineering/path-alias
        '0000-frontend-engineering/0010-path-alias.md':
            'engineering/path-alias.md',
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端基建',
                link: '/engineering/eslint-prettier',
            },
        ],

        sidebar: {
            '/engineering/': [
                {
                    text: 'eslint-prettier',
                    link: '/engineering/eslint-prettier',
                },
                {
                    text: 'vite、tsconfig、nuxt、pnpm别名设置',
                    link: '/engineering/path-alias',
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
