import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (dir: string) => resolve(__dirname, dir)

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 如果你需要在嵌套的公共路径下部署项目，只需指定 base 配置项，然后所有资源的路径都将据此配置重写,由 JS 引入的资源 URL，CSS 中的 url() 引用以及 .html 文件中引用的资源在构建过程中都会自动调整，以适配此选项。公共路径默认为/，我们指定为当前项目根目录./即可
  server: {
    port: 4000,  // 设置服务启动端口号，如果端口已经被使用，Vite 会自动尝试下一个可用的端口，默认5713
    open: true, // boolean | string 设置服务启动时是否自动打开浏览器，当此值为字符串时，会被用作 URL 的路径名
    cors: true,  // 为开发服务器配置 CORS，配置为允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // 后台服务地址
        changeOrigin: true, // 是否允许不同源
        secure: false,  // 支持https
        rewrite: path => path.replace(/^\/api/, '') // 如上配置就是将127.0.0.1:4000/api的请求 url 替换成127.0.0.1:8000
      }
    }
  },
  resolve: {
    alias: {
      '@': pathResolve('./src'), // 设置 `@` 指向 `src` 目录
      views: pathResolve('./src/views'), // 设置 `views` 指向 `./src/views` 目录，下同
      components: pathResolve('./src/components'),
      assets: pathResolve('./src/assets')
    }
  },
  build: {
    outDir: 'dist',   // 指定打包路径，默认为项目根目录下的 dist 目录
    // terser 是一个用于 ES6+ 的 JavaScript 解析器和 mangler/compressor 工具包。我们可以通过 terserOptions.compress 属性对 js 进行一定的压缩，减少打包文件体积。
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true // 生产环境去除 debugger
      }
    },
    chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
  }
})
