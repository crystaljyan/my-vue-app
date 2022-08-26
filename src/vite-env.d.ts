/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 当前文件的作用帮助编译器识别类型
// TypeScript 相比 JavaScript 增加了类型声明。原则上，TypeScript 需要做到先声明后使用。这就导致开发者在调用很多原生接口（浏览器、Node.js）或者第三方模块的时候，因为某些全局变量或者对象的方法并没有声明过，导致编译器的类型检查失败。当我们遇上Property xxx does not exist on type ...报错的时候，就可以定位到是没有声明过这个方法/属性。我们就可以在这个文件作全局声明。

/**
 * 可以看到，该文件已经默认为所有的 vue 文件声明了 DefineComponent的组件类型，这就意味着只要我们的单文件组件使用
<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        ...
    })
</script>
的写法，就能避免 vue 文件中大多数类型声明的报错，比如使用路由的this.$router、this.$route命令
*/