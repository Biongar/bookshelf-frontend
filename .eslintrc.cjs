/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  ignorePatterns: ['_source/*', 'dist/*'],
}
