import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const loadingVisible = shallowRef(true);
  const loadingText = shallowRef('请稍等, 正在加载中...');

  const showLoading = option => {
    if (option && option.title) {
      loadingText.value = option.title;
    }
    loadingVisible.value = true;
  };

  const hideLoading = () => {
    loadingVisible.value = false;
  };

  return { loadingVisible, loadingText, hideLoading, showLoading };
});
