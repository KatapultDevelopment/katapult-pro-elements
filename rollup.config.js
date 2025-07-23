import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import path from 'node:path';
const __dirname = import.meta.dirname;

export default {
  input: path.resolve(__dirname, 'index.html'),
  output: {
    dir: './build',
    format: 'esm'
  },
  plugins: [
    nodeResolve({ browser: true }),
    terser({ module: true }),
    html({
      flattenOutput: false,
      rootDir: __dirname,
      extractAssets: true
    })
  ]
}