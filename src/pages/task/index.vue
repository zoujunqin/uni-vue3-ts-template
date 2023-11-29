<template>
  <pro-page
    show-tabbar
    show-navbar
    navbar-visibility="hidden"
    class="hx-bg-[length:100%_148px] hx-bg-no-repeat"
    :style="`background-image: url(${import('@@static/task/task-bg.png')})`"
  >
    <view class="hx-pl-[16px] hx-pr-[16px]">
      <!--      <pro-input show-search-icon placeholder="请输入关键词" />-->
    </view>
  </pro-page>
</template>
<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';

onShow(() => {});
</script>
