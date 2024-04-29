import { createPinia } from 'pinia';
import { createUnistorage } from 'pinia-plugin-unistorage';
import { createSSRApp } from 'vue';

import App from './App.vue';
import '@/framework/rewiteFn';

import { shareMixin } from '@/mixins/share';

export function createApp() {
  const app = createSSRApp(App);

  const store = createPinia();
  store.use(createUnistorage());
  app.use(store);

  app.mixin(shareMixin);

  return { app };
}
