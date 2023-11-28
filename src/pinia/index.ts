import type { App } from 'vue';
import { createPinia } from 'pinia';

const pinia = createPinia();

export const setupPinia = (app: App<Element>) => {
  app.use(pinia);
};
