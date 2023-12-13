import pagesJson from '@/pages.json';

export const switchFirstTab = () => {
  uni.switchTab({ url: '/' + pagesJson.tabBar.list[0].pagePath });
};
