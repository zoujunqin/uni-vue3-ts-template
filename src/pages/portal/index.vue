<template>
  <ProPage :navbar-title="activeTabbar.text" show-navbar>
    <ProLayout>
      <ProContent>
        <Tasks v-show="activeTabbar.name === TASK_CENTER_NAME" />

        <Recommend v-show="activeTabbar.name === RECOMMEND_TASK_NAME" />

        <Person v-show="activeTabbar.name === PERSON_CENTER_NAME" />
      </ProContent>

      <ProFooter>
        <ProTabbar
          v-model="tabbarValue"
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
              <image :src="item.activeIcon" class="h-[24px] w-[24px]" />
            </template>

            <template #inactive-icon>
              <image :src="item.icon" class="h-[24px] w-[24px]" />
            </template>
          </ProTabbarItem>
        </ProTabbar>
      </ProFooter>
    </ProLayout>
  </ProPage>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';

import Person from '@/pages/portal/components/person/index.vue';
import Recommend from '@/pages/portal/components/recommend/index.vue';
import Tasks from '@/pages/portal/components/tasks/index.vue';
import { useRoute, useRouter } from '@/router/router';

const RECOMMEND_TASK_NAME = 'recommend_task';
const TASK_CENTER_NAME = 'task_center';
const PERSON_CENTER_NAME = 'person_center';

const route = useRoute();
const tabbarValue = shallowRef(route.query.test || RECOMMEND_TASK_NAME);
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

const router = useRouter();
const tabbarChange = name => {
  router.replace({
    name: 'Portal',
    query: {
      test: name
    }
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
