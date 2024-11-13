<template>
  <App v-show="show" />
</template>

<script lang="ts" setup>
import qs from 'qs';
import { onMounted, ref } from 'vue';

import App from './App.vue';

import { useRouter, RouteStack } from '@/router/router';

const show = ref(false);
onMounted(() => {
  show.value = true;

  const { router } = useRouter();
  router.historyState = window.history.state;

  const { pathname, search } = location;

  const navOptions = {
    path: pathname,
    query: qs.parse(search.slice(1)),
    type: null
  };
  const routeStack = new RouteStack(navOptions);
  router.routeStacks.push(routeStack);
  router.currentRoute = routeStack;

  const next = option => {
    if (option && routeStack.name !== option?.name) {
      router.routeStacks.pop();
      router.next(option);
    }
  };
  router.beforeEachCb(routeStack, null, next);
});
</script>
