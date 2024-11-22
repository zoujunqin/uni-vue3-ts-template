<template>
  <view class="tip-box" v-if="tipShow">
    <view class="tip-text">请阅读并勾选用户协议</view>
    <view class="triangle-div" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps({
  text: {
    type: String,
    default: ''
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
  top: -43px;
  left: -17px;
  transition: opacity 3s ease-in-out;
  height: 36px;
  white-space: nowrap;

  .tip-text {
    font-size: 13px;
    color: #595865;
    line-height: 14px;
    background-color: #fff;
    border-radius: 30px;
    height: 26px;
    line-height: 26px;
    padding: 0 14px;
  }
  .triangle-div {
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-top-color: #fff;
    position: absolute;
    left: 15px;
  }
}
</style>
