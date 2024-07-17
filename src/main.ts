import { createPinia } from 'pinia';
import { createUnistorage } from 'pinia-plugin-unistorage';
import { createSSRApp } from 'vue';

import App from './App.vue';
import '@/framework/rewiteFn';

import { fakerRefMixin } from '@/mixins/fakerRef';
import { shareMixin } from '@/mixins/share';

export function createApp() {
  const app = createSSRApp(App);

  const store = createPinia();
  store.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));

    store.$reset = () => {
      store.$patch(initialState);
    };
  });
  store.use(createUnistorage());

  app.use(store);

  app.mixin(shareMixin);
  app.mixin(fakerRefMixin);

  return { app };
}
