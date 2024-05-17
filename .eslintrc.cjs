module.exports = {
  env: {
    browser: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:vue/vue3-recommended', '.eslintrc-auto-import.json', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    semi: [2, 'never'],
  },
}
