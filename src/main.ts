import { createSSRApp } from 'vue';

import App from './App.vue';
import { setupPinia } from './pinia';
import Mixin from './utils/mixin';

export function createApp() {
  const app = createSSRApp(App);
  setupPinia(app);
  app.mixin(Mixin);
  return { app };
}
