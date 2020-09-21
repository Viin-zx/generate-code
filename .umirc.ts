import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  routes: [{ path: '/', component: '@/pages/index' }],
  proxy: {
    '/api': {
      target: 'http://172.18.1.66:30002',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
