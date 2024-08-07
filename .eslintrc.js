module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'standard-with-typescript',
        'plugin:vue/vue3-essential',
        'plugin:markdown/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue', 'prettier'],
    rules: {},
}
