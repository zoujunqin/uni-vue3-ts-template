import { createRouter, pagesJsonToRoutes } from './router';

const router = createRouter({
  routes: pagesJsonToRoutes()
});

router.beforeEach((to, from, next) => {
  // if (to.name === 'Login') {
  //   next({ name: 'Portal', type: 'replace' });
  // } else {
  next();
  // }
});

router.afterEach(() => {});

export default router;
