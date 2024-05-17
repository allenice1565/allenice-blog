module.exports = {
  env: {
    browser: true,
  },
  extends: ['plugin:vue/vue3-recommended', '.eslintrc-auto-import.json', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    semi: [2, 'never'],
  },
}
