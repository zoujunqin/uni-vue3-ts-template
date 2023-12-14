<template>
  <view class="hx-h-full hx-overflow-auto" :class="pageClass">
    <ProNavbar v-if="showNavbar" :style="navbarStyle" :text="navbarTitle" />
    <ProTabbar v-if="showTabbar" />

    <slot />
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  showNavbar: Boolean,
  showTabbar: Boolean,
  navbarTitle: {
    type: String,
    default: '导航栏'
  },
  navbarVisibility: {
    type: String,
    default: 'unset'
  }
});

const pageClass = computed(() => {
  return {
    'page-pb-with-tabbar': props.showTabbar
  };
});

const navbarStyle = computed(() => {
  return {
    visibility: props.navbarVisibility
  };
});
</script>

<script lang="ts">
export default { options: { name: 'ProPage', virtualHost: true } };
</script>
