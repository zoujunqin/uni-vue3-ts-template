<template>
  <view
    :class="backgroundImageClass"
    :style="style"
    class="pro-upload hx-relative hx-flex hx-justify-center hx-items-center hx-w-[250px] hx-h-[158px] hx-rounded-[6px] hx-bg-contain hx-bg-no-repeat"
  >
    <view
      v-if="previewUrl && !props.readonly"
      class="pro-remove-button hx-absolute hx-top-0 hx-right-0 hx-rounded-[0_6px_0_8px] hx-p-[2px] hx-flex hx-items-center hx-justify-center"
    >
      <ProIcon
        color="#fff"
        name="close"
        size="40rpx"
        @tap.stop="handleRemove"
      />
    </view>

    <ProLoadingIcon v-if="loading" mode="circle" show />
    <ProUploadButton
      v-if="!loading && !previewUrl && !props.readonly"
      :title="uploadButtonTitle"
      @tap.stop="handleUpload"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed, shallowRef, watch } from 'vue';

import ProUploadButton from './components/ProUploadButton.vue';
import { uploadProps } from './props';

import { useOss } from '@/hooks/useOss';
import { useOssUploadImage } from '@/hooks/useOssUploadImage';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps(uploadProps);
const emit = defineEmits(['uploadSuccess', 'remove']);

const { loading, upload } = useOssUploadImage({ count: 1 });

const filePath = useVModel(props, 'modelValue', undefined, {
  passive: true
});

const previewUrl = shallowRef('');
watch(
  filePath,
  async path => {
    if (!path) {
      previewUrl.value = '';
    } else {
      previewUrl.value = await useOss().getPreviewUrl(path);
    }
  },
  { immediate: true }
);

const backgroundImageClass = computed(
  () => props.backgroundName + '-background'
);

const style = computed(() => {
  return (
    previewUrl.value && {
      backgroundImage: `url(${previewUrl.value})`,
      backgroundSize: 'cover'
    }
  );
});

const handleRemove = () => {
  filePath.value = '';
  previewUrl.value = '';
  emit('remove');
};

const handleUpload = () => {
  upload({
    chooseSuccess: res => {
      const { tempFilePath } = res.tempFiles[0];
      previewUrl.value = tempFilePath;
    },
    uploadSuccess: async ({ filePath: ossPath, previewUrl: httpUrl }) => {
      const { doAfterUploadSuccess } = props;
      const flag = await doAfterUploadSuccess({ ossPath, httpUrl });

      filePath.value = flag ? ossPath : '';
      emit('uploadSuccess', ossPath);
    },
    uploadFail: handleRemove
  });
};
</script>

<script lang="ts">
export default { options: { name: 'ProUpload', virtualHost: true } };
</script>

<style lang="scss" scoped>
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
.driving-licence-background {
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
.business-licence-background {
  background-image: url($http + '/upload/business-license.png');
}
</style>
