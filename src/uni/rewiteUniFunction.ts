import { useLoadingStore } from '@/pinia/modules/loading';

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
