import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/react.ts', 'src/vue.ts', 'src/react-native.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true, // Enable code splitting to reduce bundle size
  sourcemap: false,
  clean: true,
  external: ['react', 'react-dom', 'vue', 'react-native'],
  minify: true, // Minify output to reduce size
  // Don't generate .d.mts files (duplicate type declarations)
  tsconfigOptions: {
    declaration: true,
    declarationMap: false,
  },
});
