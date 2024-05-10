<template>
  <div class="tip-box" v-if="tipShow" :style="{ width: boxWidth }">
    <span class="tip-text">请阅读并勾选用户协议</span>
    <div class="triangle-div" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps({
  text: {
    type: String,
    default: ''
  },
  boxWidth: {
    type: String,
    default: '160px'
  }
});
const tipShow = ref(false);

const open = () => {
  tipShow.value = true;
};
const close = () => {
  tipShow.value = false;
};

defineExpose({
  open,
  close
});
</script>

<script lang="ts">
export default { options: { name: 'ProTooltipPer', virtualHost: true } };
</script>
<style lang="less" scoped>
.tip-box {
  z-index: 999;
  position: absolute;
  padding: 6px 14px;
  top: -50px;
  left: -21px;
  background-color: #fff;
  border-radius: 30px;
  transition: opacity 3s ease-in-out;

  .tip-text {
    font-size: 13px;
    color: #595865;
    line-height: 14px;
  }
  .triangle-div {
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-top-color: #fff;
    position: absolute;
    bottom: -20px;
    left: 20px;
  }
}
</style>
