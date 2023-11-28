<template>
  <view class="hx-h-full hx-overflow-auto" :class="pageClass">
    <pro-navbar v-if="showNavbar" :style="navbarStyle" :text="navbarTitle" />
    <pro-tabbar v-if="showTabbar" />

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
    'page-pt-with-navbar': props.showNavbar,
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
export default {
  options: {
    virtualHost: true
  }
};
</script>

<style scoped>
.page-pt-with-navbar {
  /* 状态栏高度 + 导航栏高度 */
  padding-top: 88px;
}

.page-pb-with-tabbar {
  /* 安全区 + tabbar高度 */
  padding-bottom: calc(var(--hx-tabbar-height) + env(safe-area-inset-bottom));
}
</style>
