import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'app.ts', // Adjust this to your entry point
  output: {
    file: 'dist/app.js',
    format: 'esm',       // Use ES module syntax
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
  ],
  external: [
    'cors',
    'express',
    'serverless-http',
    'socket.io',
    'vite-plugin-vuetify'
  ],
};