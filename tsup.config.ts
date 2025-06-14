import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/actions/**/*.ts',
    'src/constants/**/*.tsx',
    'src/hooks/**/*.tsx',
    'src/providers/**/*.tsx',
    'src/utils/**/*.ts',
    'src/components/**/*.tsx',
  ],
  format: ['esm'],
  dts: { resolve: true },
  sourcemap: false,
  splitting: false,
  clean: true,
  minify: true,
  target: 'es2020',
  outDir: 'dist',
  esbuildOptions(options) {
    // Preserve folder structure khi build components
    options.outbase = 'src';
    options.alias = {
      '@': './src',
    };
  },
});
