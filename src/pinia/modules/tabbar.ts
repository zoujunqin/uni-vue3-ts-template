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
      pagePath: 'pages/task/task-center/index',
      icon: '../../static/local/tab-bar/task.png',
      selectedIcon: '../../static/local/tab-bar/task-hl.png',
      text: '任务中心'
    },
    {
      pagePath: 'pages/divide/divide-task/index',
      icon: '../../static/local/tab-bar/divide.png',
      selectedIcon: '../../static/local/tab-bar/divide-hl.png',
      text: '推荐任务'
    },
    {
      pagePath: 'pages/person/person-center/index',
      icon: '../../static/local/tab-bar/person.png',
      selectedIcon: '../../static/local/tab-bar/person-hl.png',
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
    const firstPage: PageInstance<{ route: string }> = getCurrentPages()[0];
    const tabbar = tabbarList.value.find(
      item => item.pagePath === firstPage?.route
    );
    if (JSON.stringify(currentTabbar.value) === '{}' && !!tabbar)
      currentTabbar.value = tabbar;
  };

  return { currentTabbar, tabbarList, switchTabbar, initTabbar };
});
