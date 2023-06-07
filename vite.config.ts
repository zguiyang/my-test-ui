import { defineConfig } from 'vite';
import jsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@my-test-ui': resolve(__dirname, 'packages'),
    },
  },
  plugins: [
    jsx(),
    dts({
      include: ['packages/**/*.{ts,tsx,d.ts}'],
      skipDiagnostics: true, // 是否跳过类型诊断
      copyDtsFiles: true,
      staticImport: true, // 是否将动态引入转换为静态
      tsConfigFilePath: './tsconfig.json',
      outputDir: ['./dist/lib', './dist/esm'], // 可以指定一个数组来输出到多个目录中
    }),
  ],
  build: {
    target: 'modules',
    minify: false,
    chunkSizeWarningLimit: 2,
    reportCompressedSize: true,
    emptyOutDir: false,
    outDir: resolve(__dirname, 'dist'), // 指定输出路径
    lib: {
      name: 'MYtestUi',
      entry: [
        resolve(__dirname, 'packages/components/index.ts'),
        resolve(__dirname, 'packages/my-test-ui/index.ts'),
        resolve(__dirname, 'packages/helper/index.ts'),
      ],
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es', // 打包模式 https://rollupjs.org/guide/en/#outputformat
          exports: undefined, // 导出模式 https://rollupjs.org/guide/en/#outputexports
          entryFileNames: '[name].js',
          dir: 'dist/esm', // 输出路径 https://rollupjs.org/guide/en/#outputdir
          sourcemap: false,
          preserveModules: true, // https://rollupjs.org/guide/en/#outputpreservemodules
          preserveModulesRoot: resolve('./packages', 'my-test-ui'),
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'cjs',
          exports: 'named',
          entryFileNames: '[name].js',
          dir: 'dist/lib',
          sourcemap: false,
          preserveModules: true,
          preserveModulesRoot: resolve('./packages', 'my-test-ui'),
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
  },
});
