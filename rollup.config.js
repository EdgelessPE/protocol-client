import path from 'path'
import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import esbuild from 'rollup-plugin-esbuild'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default defineConfig([
  {
    input: path.resolve(__dirname, 'src', 'index.ts'),
    plugins: [
      json(),
      ts({
        useTsconfigDeclarationDir: true,
      }),
      node(),
      cjs(),
      esbuild({
        minify: true,
      }),
    ],
    output: {
      dir: path.resolve(__dirname, 'dist', 'esm'),
      format: 'esm',
      sourcemap: true,
    },
    external: ['axios', 'compare-versions'],
  },
  {
    input: path.resolve(__dirname, 'src', 'index.ts'),
    plugins: [
      json(),
      ts({
        tsconfigOverride: {
          declaration: false,
        },
        useTsconfigDeclarationDir: true,
      }),
      node(),
      cjs(),
      esbuild({
        minify: true,
      }),
    ],
    output: {
      dir: path.resolve(__dirname, 'dist', 'cjs'),
      format: 'cjs',
      sourcemap: true,
    },
    external: ['axios', 'compare-versions'],
  },
])
