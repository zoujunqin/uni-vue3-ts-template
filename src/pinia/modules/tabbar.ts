import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import PageInstance = Page.PageInstance;

export interface ITabbar {
  pagePath: string;
  icon: unknown;
  selectedIcon: unknown;
  text: string;
}

export const useTabbarStore = defineStore('user', () => {
  const currentTabbar: Ref<ITabbar> = ref({} as any);
  const tabbarList: Ref<ITabbar[]> = ref([
    {
      pagePath: 'pages/taskCenter/index',
      icon: '../../static/tab-bar/task.png',
      selectedIcon: '../../static/tab-bar/task-hl.png',
      text: '任务中心'
    },
    {
      pagePath: 'pages/divideTask/index',
      icon: '../../static/tab-bar/divide.png',
      selectedIcon: '../../static/tab-bar/divide-hl.png',
      text: '推荐任务'
    },
    {
      pagePath: 'pages/personCenter/index',
      icon: '../../static/tab-bar/person.png',
      selectedIcon: '../../static/tab-bar/person-hl.png',
      text: '个人中心'
    }
  ]);

  const switchTabbar = (path: string) => {
    return new Promise((resolve, reject) => {
      const tabbar = tabbarList.value.find(item => item.pagePath === path);

      if (!tabbar) reject();
      else {
        currentTabbar.value = tabbar;
        uni.switchTab({ url: '/' + tabbar.pagePath });
        resolve(true);
      }
    });
  };

  const initTabbar = () => {
    uni.hideTabBar({ animation: false });

    const firstPage: PageInstance<{ route: string }> = getCurrentPages()[0];
    const tabbar = tabbarList.value.find(
      item => item.pagePath === firstPage?.route
    );
    if (JSON.stringify(currentTabbar.value) === '{}' && !!tabbar)
      currentTabbar.value = tabbar;
  };

  return { currentTabbar, tabbarList, switchTabbar, initTabbar };
});
