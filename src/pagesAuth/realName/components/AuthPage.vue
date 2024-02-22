<template>
  <view
    class="hx-flex hx-flex-col hx-justify-between hx-items-center hx-w-[100%] hx-pt-[50px] hx-bg-white"
  >
    <view class="hx-flex hx-flex-col hx-items-center">
      <image
        class="hx-w-[180px] hx-h-[180px]"
        :src="import('@http/real-name/auth-face.png')"
      />
      <p class="hx-text-text-color-main hx-text-[20px] hx-font-[600]">
        开始活体认证
      </p>
      <p
        class="hx-text-text-color-tip hx-text-[16px] hx-font-[400] hx-mt-[12px]"
      >
        更便捷，更安全
      </p>
    </view>
    <view class="hx-flex hx-justify-around hx-w-[100%]">
      <view class="hx-flex hx-flex-col hx-items-center">
        <view class="icon-box">
          <image
            class="hx-w-[26px] hx-h-[26px]"
            :src="import('@http/real-name/light.png')"
          />
        </view>
        <span class="tip-text">光线充足</span>
      </view>
      <view class="hx-flex hx-flex-col hx-items-center">
        <view class="icon-box">
          <image
            class="hx-w-[26px] hx-h-[26px]"
            :src="import('@http/real-name/phone.png')"
          />
        </view>
        <span class="tip-text">正对手机</span>
      </view>
      <view class="hx-flex hx-flex-col hx-items-center">
        <view class="icon-box">
          <image
            class="hx-w-[26px] hx-h-[26px]"
            :src="import('@http/real-name/face.png')"
          />
        </view>
        <span class="tip-text">脸无遮挡</span>
      </view>
    </view>
    <view class="hx-flex hx-justify-center hx-items-center hx-mb-[10px]">
      <image
        class="hx-w-[14px] hx-h-[14px]"
        :src="import('@http/real-name/information.png')"
      />
      <span class="hx-text-text-color-tip hx-text-[14px] hx-font-[400]">
        请授权通过人脸识别功能验证您的身份信息
      </span>
    </view>
    <ProPageFooter>
      <ProButton class="hx-w-full" type="primary" @tap.stop="handleAuth">
        开始认证
      </ProButton>
    </ProPageFooter>
  </view>
</template>

<script setup lang="ts">
import { useHandlerAuth } from '../hooks/useHandlerAuth';
// import { useVModel } from '@/hooks/useVModel';

// const props = defineProps({
//   modelValue: {
//     type: Object,
//     default: () => ({})
//   }
// });
// const data = useVModel(props, 'modelValue', undefined, {
//   passive: true
// });
const { handleAuth } = useHandlerAuth();
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
<style scoped>
.icon-box {
  background: #f8f8f8;
  border-radius: 50%;
  padding: 11px;
  width: 48px;
  height: 48px;
  margin-bottom: 10px;
}
.tip-text {
  font-weight: 500;
  font-size: 14px;
  color: var(--hx-text-color-tip);
}
</style>
