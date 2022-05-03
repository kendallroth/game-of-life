/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    // Let me shoot myself in the foot if I want!
    "@typescript-eslint/ban-ts-comment": "off",
    // Let me shoot myself in the foot if I want!
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
