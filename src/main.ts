import { createSSRApp } from 'vue';

import App from './App.vue';
import { setupPinia } from './pinia';
import '@/framework/rewiteFn';

import { shareMixin } from '@/mixins/share';

export function createApp() {
  const app = createSSRApp(App);

  app.mixin(shareMixin);
  setupPinia(app);

  return { app };
}
