import { createPinia } from 'pinia';
import { createUnistorage } from 'pinia-plugin-unistorage';
import { createSSRApp } from 'vue';

import '@/uni/rewiteUniFunction';
/* #ifdef MP-WEIXIN */
// eslint-disable-next-line import/order
import App from '@/App.vue';
/* #endif */

/* #ifndef MP-WEIXIN */
// eslint-disable-next-line import/order
import App1 from '@/App1.vue';
/* #endif */

import { fakerRefMixin } from '@/mixins/fakerRef';
import { shareMixin } from '@/mixins/share';
import router from '@/router';

export function createApp() {
  /* #ifdef MP-WEIXIN */
  const app = createSSRApp(App);
  /* #endif */

  /* #ifndef MP-WEIXIN */
  const app = createSSRApp(App1);
  /* #endif */

  const store = createPinia();
  store.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));

    store.$reset = () => {
      store.$patch($state => {
        Object.assign($state, initialState);
      });
    };
  });
  store.use(createUnistorage());

  app.use(store);
  app.use(router);

  app.mixin(shareMixin);
  app.mixin(fakerRefMixin);

  return { app };
}
