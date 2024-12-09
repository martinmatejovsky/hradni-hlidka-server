import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';

export default {
  input: 'app.ts',
  output: {
    file: 'dist/app.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    json({
      compact: true
    }),
    copy({
      targets: [
        { src: 'src/constants/**/*', dest: 'dist/constants' },
        { src: 'src/controllers/**/*', dest: 'dist/controllers' },
        { src: 'src/routes/**/*', dest: 'dist/routes' },
      ]
    })
  ]
};