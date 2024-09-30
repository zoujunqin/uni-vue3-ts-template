<template>
  <div />
</template>

<script setup lang="ts">
const params = new URLSearchParams(window.location.search);
const c = params.get('c');
const scene = `t=1001&c=${c}&type=link`;
const res = encodeURIComponent(scene);
const envAppid = import.meta.env.VITE_MP_WEIXIN_APP_ID;
const weixinEnv = import.meta.env.VITE_MP_WEIXIN_ENV;
const a = document.createElement('a');
a.href =
  `weixin://dl/business/?appid=${envAppid}&path=pagesTransfer/index&env_version=${weixinEnv}&query=` +
  res;
a.click();
</script>

<style scoped></style>
