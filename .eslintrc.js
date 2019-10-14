module.exports = {
  "parser": "babel-eslint",
  "env": {
    "jest": true,
    "browser": true,
    "node": true,
    'es6': true,
    'commonjs': true,
  },
  "plugins": [
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
  },
  "rules": {
    "new-cap": 0,
    "eol-last": 0,
    "no-invalid-this": 0,
    "no-console": 0,
    "object-curly-spacing": 0,
    "space-before-function-paren": 0,
    "linebreak-style": 0,
    "require-jsdoc": 0,
    "valid-jsdoc": 0,
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "prefer-promise-reject-errors": 0,
    "prefer-const": 0,
    "max-len": 0,
    "no-debugger": 0,
    "quotes": ["error", "single", { "allowTemplateLiterals": true }], //引号类型 `` "" ''
    "quote-props": ["error", "as-needed"], // 对象key值强制去除引号
    // "semi": [1, "never"], // 禁用分号
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
};
