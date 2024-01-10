<template>
  <view
    :style="style"
    :class="backgroundImageClass"
    class="pro-upload hx-relative hx-flex hx-justify-center hx-items-center hx-w-[250px] hx-h-[158px] hx-rounded-[6px] hx-bg-contain hx-bg-no-repeat"
  >
    <view
      v-if="previewPath"
      class="pro-remove-button hx-absolute hx-top-0 hx-right-0 hx-rounded-[0_6px_0_8px] hx-p-[2px] hx-flex hx-items-center hx-justify-center"
    >
      <ProIcon
        name="close"
        color="#fff"
        size="40rpx"
        @tap.stop="handleRemove"
      />
    </view>

    <ProLoadingIcon v-if="loading" mode="circle" show />
    <ProUploadButton
      v-if="!loading && !previewPath"
      :title="uploadButtonTitle"
      @tap.stop="handleUpload"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, shallowRef } from 'vue';

import ProUploadButton from './components/ProUploadButton.vue';
import { uploadProps } from './props';

import { useOssUploadImage } from '@/hooks/useOssUploadImage';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps(uploadProps);

const { loading, upload } = useOssUploadImage({ count: 1 });

const uploadValue = useVModel(props, 'modelValue', undefined, {
  passive: true
});
const emit = defineEmits(['uploadSuccess', 'handleRemovePath']);

const backgroundImageClass = computed(
  () => props.backgroundName + '-background'
);

const previewPath = shallowRef('');
const style = computed(() => {
  return previewPath.value && { backgroundImage: `url(${previewPath.value})` };
});

const handleRemove = () => {
  previewPath.value = '';
  uploadValue.value = '';
  emit('handleRemovePath');
};

const handleUpload = () => {
  upload({
    chooseSuccess: res => {
      const { tempFilePath } = res.tempFiles[0];
      previewPath.value = tempFilePath;
    },
    uploadSuccess: res => {
      uploadValue.value = res.filePath;
      nextTick(() => {
        emit('uploadSuccess', res.previewUrl);
      });
    },
    uploadFail: handleRemove
  });
};
</script>

<script lang="ts">
export default { options: { name: 'ProUpload', virtualHost: true } };
</script>

<style scoped lang="scss">
.pro-remove-button {
  background-color: rgb(20 23 49 / 60%);
}

/* 身份证背面 */
.back-id-card-background {
  background-image: url($http + '/upload/back-id-card.png');
}

/* 身份证正面 */
.front-id-card-background {
  background-image: url($http + '/upload/front-id-card.png');
}

/* 驾驶证 */
.driving-license-background {
  background-image: url($http + '/upload/driving-license.png');
}

/* 健康证 */
.health-certificate-background {
  background-image: url($http + '/upload/health-certificate.png');
}

/* 其他证 */
.other-certificate-background {
  background-image: url($http + '/upload/other-certificate.png');
}

/* 营业执照 */
.business-license-background {
  background-image: url($http + '/upload/business-license.png');
}
</style>
