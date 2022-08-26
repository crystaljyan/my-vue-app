module.exports =  {
  root: true,
  env: { // 提供预定义的环境变量
   browser: true,
   es2021: true, // // 添加所有 ECMAScript 2021 全局变量并自动将 ecmaVersion 解析器选项设置为 12
   node: true,
   jest: true
   },
  globals: {
   ga: true,
   chrome: true,
   __DEV__: true
   },
  // 解析 .vue 文件
  parser: 'vue-eslint-parser', 
  extends: [ // 使用预设的 lint 包 如果要我们自己去设置各个规则未免会显得繁琐，所以可以直接使用业界的最佳实践
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
   ],
  plugins: ['@typescript-eslint'], // 增强 ESlint 功能
  parserOptions: {
   parser: '@typescript-eslint/parser', // 解析 .ts 文件
   ecmaVersion: "latest",  // 支持的es版本
   sourceType: 'module' // 代模块类型，默认为script，我们设置为module
   },
  rules: {
   'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   'prettier/prettier': 'error',
   'no-unused-vars': 'error', // 禁止出现未使用过的变量
   'arrow-parens': 'off', // 只有一个参数时，箭头函数体可以省略圆括号
   'indent': [ // 缩进使用 4 个空格，并且 switch 语句中的 Case 需要缩进
      'error',
      4,
      { 
        'SwitchCase': 1,
        'flatTernaryExpressions': true
      }
    ]
   }
 }