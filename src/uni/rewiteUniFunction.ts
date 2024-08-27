import ReLaunchOptions = UniNamespace.ReLaunchOptions;
import { loginPagePath, loginPagePaths } from '@/constant/pagePath';
import { useLoadingStore } from '@/pinia/modules/loading';
import { useUserStore } from '@/pinia/modules/user';
import {
  INavigationToOptions,
  IRedirectToOptions
} from '@/uni/types/rewriteUniTypes';

uni.showLoading = option => {
  useLoadingStore().showLoading(option);
};

uni.hideLoading = () => {
  useLoadingStore().hideLoading();
};

/* 重写 uni.showToast */
const originShowToast = uni.showToast;
uni.showToast = option => {
  setTimeout(() => {
    originShowToast(option);
  }, 0);
};

/* 重复 navigate 到相同的页面 */
const isRepeatNavigate = (url: string) => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1]!;
  return url === currentPage!.$page!.fullPath;
};

const doWithoutToken = (options, cb: Function) => {
  const { url, auth } = options;
  const { token } = useUserStore();

  if (isRepeatNavigate(url)) {
    return;
  }

  if (auth !== false && !token && !loginPagePaths.includes(url)) {
    return originNavigateTo({ url: loginPagePath });
  } else {
    return cb(options);
  }
};

/* 重写 uni.navigateTo, 判断是否登录，未登录先到登录页 */
const originNavigateTo = uni.navigateTo;
uni.navigateTo = (options: INavigationToOptions) => {
  return doWithoutToken(options, originNavigateTo);
};

/* 重写 uni.reLaunch, 判断是否登录，未登录先到登录页 */
const originReLaunch = uni.reLaunch;
uni.reLaunch = (options: ReLaunchOptions) => {
  return doWithoutToken(options, originReLaunch);
};

/* 重写 uni.reLaunch, 判断是否登录，未登录先到登录页 */
const originRedirectTo = uni.redirectTo;
uni.redirectTo = (options: IRedirectToOptions) => {
  return doWithoutToken(options, originRedirectTo);
};
