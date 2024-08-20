import { ConfigEnv, UserConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import viteCompression from "vite-plugin-compression";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// svg icon整合
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const pathSrc: string = path.resolve(__dirname, "src");

import { name, version, engines, dependencies, devDependencies } from "./package.json";

// import

/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now(),
};

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      __VUE_PROD_DEVTOOLS__: true,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    // 路径别名
    resolve: {
      alias: {
        "~": pathSrc,
        "@": pathSrc,
      },
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true,
      // 本地开发反向代理解决本地接口跨域问题
      proxy: {
        /** 代理前缀为 /dev-api 的请求  */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 接口地址
          target: env.VITE_APP_API_URL,
          // rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        // 是否在 vue 模板中自动导入
        vueTemplate: true,
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "pinia", "vue-router"],
        eslintrc: {
          // 是否自动生成 eslint 规则，建议生成之后设置 false
          enabled: false,
          // 指定自动导入函数 eslint 规则的文件
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        dirs: ["src/api"],
        dts: false,
        // 指定自动导入函数TS类型声明文件路径
        // dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
            enabledCollections: ["ep"],
          }),
        ],
        dts: false,
        // 指定自动导入组件TS类型声明文件路径
        // dts: path.resolve(pathSrc, "types", "components.d.ts"),
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      viteCompression({
        verbose: true,
        disable: false,
        deleteOriginFile: false,
        threshold: 1024 * 10, // 10kb下压缩
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    // 构建配置
    build: {
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      minify: "terser",
      terserOptions: {
        compress: {
          // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          keep_infinity: true,
          // 生产环境去除 console
          drop_console: true,
          // 生产环境去除 debugger
          drop_debugger: true,
        },
        format: {
          // 删除注释
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          // manualChunks: {
          //   "vue-i18n": ["vue-i18n"],
          // },
          manualChunks(id: any) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "js/[name].[hash].js",
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            // console.log('文件信息', assetInfo.name)
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "media";
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `${extType}/[name].[hash].[ext]`;
          },
        },
      },
    },
  };
};
