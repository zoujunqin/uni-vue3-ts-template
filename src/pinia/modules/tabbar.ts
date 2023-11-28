import TaskIcon from '@/static/local/tab-bar/task.png';
import TaskHighlightIcon from '@/static/local/tab-bar/task-hl.png';
import DividIcon from '@/static/local/tab-bar/divide.png';
import DividHighlightIcon from '@/static/local/tab-bar/divide-hl.png';
import PersonIcon from '@/static/local/tab-bar/person.png';
import PersonHighlightIcon from '@/static/local/tab-bar/person-hl.png';

import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import PageInstance = Page.PageInstance;

export interface ITabbar {
  pagePath: string;
  icon: unknown;
  selectedIcon: unknown;
  text: string;
}

interface ITabbarInfo {
  current: ITabbar;
  list: Array<ITabbar>;
}

export const useTabbarStore = defineStore('user', () => {
  const tabbarInfo: Ref<ITabbarInfo> = ref({
    current: {} as any,
    list: [
      {
        pagePath: 'pages/task/index',
        icon: TaskIcon,
        selectedIcon: TaskHighlightIcon,
        text: '任务中心'
      },
      {
        pagePath: 'pages/divide/index',
        icon: DividIcon,
        selectedIcon: DividHighlightIcon,
        text: '推荐任务'
      },
      {
        pagePath: 'pages/person/index',
        icon: PersonIcon,
        selectedIcon: PersonHighlightIcon,
        text: '个人中心'
      }
    ]
  });

  const switchTabbar = (path: string) => {
    return new Promise((resolve, reject) => {
      const tabbar = tabbarInfo.value.list.find(item => item.pagePath === path);

      if (!tabbar) reject();
      else {
        tabbarInfo.value.current = tabbar;
        uni.switchTab({ url: '/' + tabbar.pagePath });
        resolve(true);
      }
    });
  };

  const initTabbar = () => {
    const firstPage: PageInstance<{ route: string }> = getCurrentPages()[0];
    const tabbar = tabbarInfo.value.list.find(
      item => item.pagePath === firstPage?.route
    );
    if (JSON.stringify(tabbarInfo.value.current) === '{}' && !!tabbar)
      tabbarInfo.value.current = tabbar;
  };

  return { tabbarInfo, switchTabbar, initTabbar };
});
