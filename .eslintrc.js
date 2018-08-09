// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  // https://github.com/standard/eslint-config-standard
  extends: 'standard',
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "never"]
  }
}
