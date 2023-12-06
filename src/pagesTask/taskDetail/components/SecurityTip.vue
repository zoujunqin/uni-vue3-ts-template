<template>
  <view class="section-title hx-flex hx-items-center">
    <image
      class="hx-w-[18px] hx-h-[18px] hx-mr-[3px] hx-mb-[1px]"
      src="@/static/local/task-detail/security-shield.png"
    />
    <text> 安全提示 </text>
  </view>
  <view
    class="hx-mb-[10px] hx-text-[14px] hx-font-[400] hx-leading-[21px] hx-text-text-color"
  >
    严禁用人单位和公司用户做出任何损害求职者的合法权益的违法行为，包括但不限于扣押求职者证件，收取求职者财物，向求职者集资，让求职者入股，参加异地培训等。您一旦发现由此类型行为，可立即
    <text class="hx-text-color-primary" @tap.stop="handleReport">
      举报公安部门
    </text>
    。
  </view>
</template>

<script setup lang="ts">
const handleReport = () => {
  uni.makePhoneCall({ phoneNumber: '110' });
};
</script>
