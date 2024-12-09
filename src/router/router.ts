import qs from 'qs';

import pagesJson from '@/pages.json';

const getHandledOption = option => {
  const paths = option.path?.split('?') || [];
  return {
    ...option,
    path: paths[0],
    query: {
      ...(option.query || {}),
      ...(qs.parse(paths[1]) || {})
    }
  };
};

export class Route {
  path;
  name;
  route;
  style;
  needLogin;
  constructor({ path, name, route, style, needLogin }) {
    this.path = path;
    this.name = name;
    this.route = route;
    this.style = style;
    this.needLogin = needLogin;
  }
}

export class RouteStack {
  path;
  name;
  fullPath;
  query;
  type = null;
  from = null;
  constructor({ path, name, query, type }) {
    const route = Router.routerInstance.routesMap[path || name];
    this.path = route.path;
    this.name = route.name;
    this.query = query || {};
    this.type = type || null;
    this.fullPath = [path, qs.stringify(query || {})].filter(Boolean).join('?');
  }
}

export const pagesJsonToRoutes = () => {
  const { pages, subPackages } = pagesJson;
  return pages
    .map(item => {
      return new Route({ ...item, path: '/' + item.path, route: item.path });
    })
    .concat(
      subPackages.reduce((res, item) => {
        res.push(
          ...item.pages.map(page => {
            return new Route({
              ...page,
              path: '/' + item.root + '/' + page.path,
              route: item.root + '/' + page.path
            });
          })
        );
        return res;
      }, [])
    );
};

export class Router {
  beforeEachCb = () => {};
  routerBeforeCallback = () => {};
  routerAfterCallback = () => {};
  routeStacks = [];
  routes = [];
  routesMap = {};
  currentRoute = null;

  backDelta = 1;
  historyState = null;

  static routerInstance;
  static uniNavigateTo;
  static uniNavigateBack;
  static uniRedirectTo;
  static uniRelaunch;

  constructor({ routes } = { routes: [] }) {
    this.routeStacks = [];
    this.routes = routes;
    this.createRoutesMap();
  }

  createRoutesMap() {
    this.routesMap = this.routes.reduce((res, item) => {
      res[item.name] = item;
      res[item.route] = item;
      res[item.path] = item;
      return res;
    }, {});
    this.routesMap['/'] = this.routes[0];
  }

  back(step = 1) {
    step = Math.abs(step);
    this.backDelta = step || 1;
    return new Promise((resolve, reject) => {
      Router.uniNavigateBack({
        delta: step,
        success: resolve,
        fail: reject
      });
    });
  }

  push(option) {
    option = getHandledOption({ ...option, type: 'push' });
    if (this.routerBeforeCallback) {
      this.routerBeforeCallback(option);
    } else {
      this.next(option);
    }
  }

  replace(option) {
    option = getHandledOption({ ...option, type: 'replace' });
    if (this.routerBeforeCallback) {
      this.routerBeforeCallback(option);
    } else {
      this.next(option);
    }
  }

  replaceAll(option) {
    this.reLaunch(option);
  }
  reLaunch(option) {
    option = getHandledOption({ ...option, type: 'reLaunch' });
    if (this.routerBeforeCallback) {
      this.routerBeforeCallback(option);
    } else {
      this.next(option);
    }
  }

  getRouteStack(path) {
    path = path === '/' ? this.routes[0].name : path;

    for (let i = this.routeStacks.length - 1; i >= 0; i--) {
      const item = this.routeStacks[i];
      if ([item.name, item.path].includes(path)) {
        return item;
      }
    }
    return null;
  }

  next(option: {
    path?: string;
    name?: string;
    type?: string;
    query?: Object;
    events?: Object;
    animationType?: string;
    animationDuration?: number;
    success?: Function;
    fail?: Function;
    complete?: Function;
  }) {
    const route = this.routesMap[option.name] || this.routesMap[option.path];
    if (!route) {
      throw new Error('未找到对应的路由');
    }

    const path = [route.path, qs.stringify(option.query || {})]
      .filter(Boolean)
      .join('?');

    switch (option.type) {
      case 'push': {
        const lastRouteStack = useRoute();
        const newRouteStack = new RouteStack({ ...option, ...route });
        newRouteStack.from = lastRouteStack;

        this.routeStacks.push(newRouteStack);
        this.currentRoute = newRouteStack;

        Router.uniNavigateTo({
          url: path,
          events: option.events,
          animationType: option.animationType,
          animationDuration: option.animationDuration,
          success: (...args) => {
            /* #ifdef H5 */
            this.historyState = window.history.state;
            /* #endIf */
            option.success?.(...args);
          },
          fail: option.fail,
          complete: option.complete
        });
        break;
      }

      case 'replace': {
        const lastRouteStack = useRoute();
        const newRouteStack = new RouteStack({ ...option, ...route });
        newRouteStack.from = lastRouteStack;

        this.routeStacks.pop();
        this.routeStacks.push(newRouteStack);
        this.currentRoute = newRouteStack;

        Router.uniRedirectTo({
          url: path,
          events: option.events,
          success: (...args) => {
            /* #ifdef H5 */
            this.historyState = window.history.state;
            /* #endIf */

            option.success?.(...args);
          },
          fail: option.fail,
          complete: option.complete
        });
        break;
      }

      case 'reLaunch':
      case 'replaceAll': {
        const lastRouteStack = useRoute();
        const newRouteStack = new RouteStack({ ...option, ...route });
        newRouteStack.from = lastRouteStack;

        this.routeStacks = [];
        this.routeStacks.push(newRouteStack);
        this.currentRoute = newRouteStack;

        Router.uniRelaunch({
          url: path,
          events: option.events,
          success: (...args) => {
            /* #ifdef H5 */
            this.historyState = window.history.state;
            /* #endIf */

            option.success?.(...args);
          },
          fail: option.fail,
          complete: option.complete
        });
        break;
      }
    }
  }

  beforeEach(cb) {
    this.beforeEachCb = cb;
    this.routerBeforeCallback = (navOptions, callbackNext) => {
      const next = option => {
        if (option === false) return;

        this.next(option || navOptions);
      };

      const toRoute = new RouteStack(navOptions);
      const fromRoute = useRoute();
      cb(toRoute, fromRoute, callbackNext || next);
    };
  }

  afterEach(cb) {
    this.routerAfterCallback = cb;
  }

  install(Vue) {
    Router.uniNavigateTo = uni.navigateTo;
    Router.uniRedirectTo = uni.redirectTo;
    Router.uniNavigateBack = uni.navigateBack;
    Router.uniRelaunch = uni.reLaunch;

    const handleBack = () => {
      this.routeStacks = this.routeStacks.slice(
        0,
        this.routeStacks.length - this.backDelta
      );
      this.backDelta = 1;
      this.currentRoute = this.routeStacks.slice(-1)[0];
    };

    Vue.mixin({
      onLoad: () => {
        const route = useRoute();
        this.routerAfterCallback(route, route && route.from, this.next);
      },

      /* #ifdef APP-PLUS || APP-PLUS-NVUE */
      onBackPress: e => {
        if (e.from === 'backbutton') {
          this.back().then(handleBack);
        }
      }
      /* #endif */
    });

    /* #ifdef H5 */
    window.addEventListener('popstate', e => {
      const { position: fromPosition } = this.historyState;
      const {
        state: { back, current, forward, position: toPosition }
      } = e;

      const backs = back?.split('?');
      const currents = current.split('?');
      const forwards = forward?.split('?');

      const toRoute = new RouteStack({
        path: currents[0],
        query: qs.parse(currents[1]),
        type: 'push'
      });
      if (!this.getRouteStack(toRoute.name)) {
        const next = option => {
          if (option && toRoute.name !== option.name) {
            this.next(option);
          } else {
            if (fromPosition > toPosition) {
              toRoute.from = this.getRouteStack(forwards[0]);
              this.routeStacks.unshift(toRoute);
            } else {
              toRoute.from = this.getRouteStack(backs[0]);
              this.routeStacks.push(toRoute);
            }
            this.currentRoute = toRoute;
          }
        };

        const fromRoute = useRoute();
        this.beforeEachCb(toRoute, fromRoute, next);
      } else {
        handleBack();
      }

      this.historyState = window.history.state;
    });
    /* #endif */

    /* #ifdef MP-WEIXIN */
    wx.onAppRoute(e => {
      if (e.openType === 'navigateBack') {
        handleBack();
      }
    });
    /* #endif */
  }
}

export const createRouter = ({ routes }) => {
  if (Router.routerInstance) {
    throw new Error('只能存在一个路由实例');
  }
  Router.routerInstance = new Router({ routes });
  return Router.routerInstance;
};

export const useRouter = () => {
  return Router.routerInstance;
};

export const useRoute = () => {
  return Router.routerInstance.currentRoute || null;
};
