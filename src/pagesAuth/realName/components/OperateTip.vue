<template>
  <ProPopup round="10" closeable ref="proPopupRef" mode="bottom">
    <view class="hx-p-[16px_16px_30px_16px]">
      <view class="section-title hx-mb-[16px]"> 个人认证操作说明 </view>

      <view
        class="hx-mb-[16px] hx-text-font-size-base hx-text-text-color hx-font-[400] hx-leading-[21px]"
      >
        <view> 身份证拍摄 </view>
        <view> 大陆公民持有的本人有效二代身份证 </view>
        <view> 拍摄时确保身份证 边框完整，字体清晰:亮度均匀 </view>
      </view>

      <view class="hx-flex hx-items-center hx-justify-between hx-mb-[16px]">
        <view
          class="hx-flex hx-flex-col hx-justify-end hx-items-center hx-h-[72px] hx-w-[78px] hx-bg-[length:100%] hx-bg-no-repeat"
          :style="`background-image: url(${item.backgroundImage})`"
          v-for="(item, index) in examples"
          :key="index"
        >
          <ProIcon :name="item.iconName" :color="item.iconColor" />
          <text
            class="hx-mt-[4px] hx-text-font-size-sm hx-font-[400] hx-leading-[18px]"
          >
            {{ item.title }}
          </text>
        </view>
      </view>

      <view
        class="hx-text-text-color hx-text-font-size-base hx-font-[400] hx-leading-[21px]"
      >
        四要素注意事项
      </view>
      <view
        class="hx-text-text-color hx-text-font-size-base hx-font-[400] hx-leading-[21px]"
      >
        姓名，手机号，身份证号以及银行卡号必须
        同属于一个自然人:若手机号码为新号或近期携号转网 (7~15日内)
        的，请在15日后再提交认证
      </view>
    </view>
  </ProPopup>
</template>

<script setup lang="ts">
import { nextTick, onMounted, shallowRef } from 'vue';

const examples = [
  {
    backgroundImage: import('@/static@http/real-name/standard-id-card.png'),
    title: '标准',
    iconName: 'checkmark-circle-fill',
    iconColor: 'primary'
  },
  {
    backgroundImage: import('@/static@http/real-name/miss-border-id-card.png'),
    title: '边框缺失',
    iconName: 'close-circle-fill',
    iconColor: 'error'
  },
  {
    backgroundImage: import('@/static@http/real-name/blurry-id-card.png'),
    title: '照片模糊',
    iconName: 'close-circle-fill',
    iconColor: 'error'
  },
  {
    backgroundImage: import('@/static@http/real-name/strong-flash-id-card.png'),
    title: '闪光强烈',
    iconName: 'close-circle-fill',
    iconColor: 'error'
  }
];

const proPopupRef = shallowRef();
onMounted(async () => {
  await nextTick();
  // proPopupRef.value.open();
});
</script>
