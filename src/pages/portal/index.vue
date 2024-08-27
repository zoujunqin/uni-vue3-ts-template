<template>
  <ProPage :navbar-title="activeTabbar.text" show-navbar>
    <view class="hx-h-full hx-flex hx-flex-col">
      <Tasks
        v-if="tabbarList[0].load"
        v-show="tabbarList[0].visible"
        class="hx-flex-1"
      />

      <Recommend
        v-if="tabbarList[1].load"
        v-show="tabbarList[1].visible"
        class="hx-flex-1"
      />

      <Person
        class="hx-flex-1"
        v-if="tabbarList[2].load"
        v-show="tabbarList[2].visible"
      />

      <ProTabbar
        v-model="tabbarValue"
        :fixed="false"
        :placeholder="false"
        class="portal-tabbar"
        @change="tabbarChange"
      >
        <ProTabbarItem
          v-for="item in tabbarList"
          :key="item.name"
          :name="item.name"
          :text="item.text"
        >
          <template #active-icon>
            <image :src="item.activeIcon" class="hx-h-[24px] hx-w-[24px]" />
          </template>

          <template #inactive-icon>
            <image :src="item.icon" class="hx-h-[24px] hx-w-[24px]" />
          </template>
        </ProTabbarItem>
      </ProTabbar>
    </view>
  </ProPage>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';

import Person from '@/pages/portal/components/person/index.vue';
import Recommend from '@/pages/portal/components/recommend/index.vue';
import Tasks from '@/pages/portal/components/tasks/index.vue';

const RECOMMEND_TASK_NAME = 'recommend_task';
const TASK_CENTER_NAME = 'task_center';
const PERSON_CENTER_NAME = 'person_center';

const tabbarValue = shallowRef(RECOMMEND_TASK_NAME);
const tabbarList = ref([
  {
    icon: '/static/tabbar/task.svg',
    activeIcon: '/static/tabbar/task-hl.svg',
    text: '任务中心',
    name: TASK_CENTER_NAME,
    load: false,
    visible: false
  },
  {
    icon: '/static/tabbar/divide.svg',
    activeIcon: '/static/tabbar/divide-hl.svg',
    text: '推荐任务',
    name: RECOMMEND_TASK_NAME,
    load: true,
    visible: true
  },
  {
    icon: '/static/tabbar/person.svg',
    activeIcon: '/static/tabbar/person-hl.svg',
    text: '个人中心',
    name: PERSON_CENTER_NAME,
    load: false,
    visible: false
  }
]);

const activeTabbar = computed(() => {
  return tabbarList.value.find(item => item.name === tabbarValue.value);
});

const tabbarChange = name => {
  tabbarList.value.forEach(item => {
    const flag = item.name === name;
    if (!item.load) {
      item.load = flag;
    }
    item.visible = flag;
  });
};
</script>

<style>
page {
  background: linear-gradient(180deg, #fff 18.25%, #f7f8fa 92.19%);
}

.portal-tabbar .uv-tabbar__content {
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}
</style>
