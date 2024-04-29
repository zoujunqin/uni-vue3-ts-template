import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const loadingVisible = shallowRef(false);
  const loadingText = shallowRef('请稍等, 正在加载中...');
  let loadingCount = 0;

  const showLoading = option => {
    if (option && option.title) {
      loadingText.value = option.title;
    }
    loadingVisible.value = true;
    loadingCount += 1;
  };

  const hideLoading = () => {
    loadingCount -= 1;
    if (loadingCount === 0) {
      loadingVisible.value = false;
    }
  };

  return { loadingVisible, loadingText, hideLoading, showLoading };
});
