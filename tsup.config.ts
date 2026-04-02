import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/react.ts', 'src/vue.ts', 'src/react-native.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['react', 'react-dom', 'vue', 'react-native'],
  // Don't generate .d.mts files (duplicate type declarations)
  tsconfigOptions: {
    declaration: true,
    declarationMap: false,
  },
});
