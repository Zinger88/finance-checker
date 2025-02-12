import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error See https://github.com/gxmari007/vite-plugin-eslint/issues/79
import eslintPlugin from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), eslintPlugin()],
});
