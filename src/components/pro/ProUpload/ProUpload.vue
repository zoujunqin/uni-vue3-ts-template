<template>
  <view class="pro-upload flex flex-wrap items-center gap-[8px]">
    <view v-if="fileList.length" class="file-list flex flex-wrap gap-[8px]">
      <view
        v-for="(item, index) in fileList"
        :key="index"
        :style="{ width, height }"
        :class="{ 'rounded-[6px]': borderRadius }"
        class="relative rounded-[6px] overflow-hidden"
      >
        <view
          v-if="[STATUS_UPLOADING, STATUS_FAILED].includes(item.status)"
          class="layer absolute z-[9] left-0 top-0 w-full h-full flex flex-col justify-center items-center bg-[#0000007f]"
        >
          <ProIcon
            v-if="item.status === STATUS_FAILED"
            name="close-circle"
            color="#ffffff"
            size="25"
          />
          <ProLoadingIcon v-else size="22" mode="circle" />
          <view class="text-[12px] text-white mt-[5px]">
            {{ item.message }}
          </view>
        </view>

        <view
          v-if="!disabled && item.status !== STATUS_UPLOADING"
          class="flex absolute z-10 right-0 top-0 w-[14px] h-[14px] bg-[#373737] rounded-bl-[12px]"
          @click="handleRemoveFile(item, index)"
        >
          <ProIcon
            class="mt-[50%] ml-[50%] -translate-x-[35%] -translate-y-[60%]"
            name="close"
            color="#fff"
            size="7"
          />
        </view>

        <view
          v-if="item.status === STATUS_SUCCESS"
          class="absolute z-10 right-0 bottom-0 border-solid border-[9px] border-t-transparent border-l-transparent border-r-[#5ac725] border-b-[#5ac725]"
        >
          <ProIcon
            class="absolute t-[50%] l-[50%] -translate-x-[10%] -translate-y-[10%]"
            name="checkmark"
            color="#fff"
            size="10"
          />
        </view>

        <view class="relative w-full h-full bg-[#F4F5F7]">
          <image
            v-if="!disabled && video(item.filePath)"
            :src="getAssetsResource('@http/upload/play.svg')"
            class="absolute w-[22px] h-[22px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
            @click="disabled ? noop() : handlePreviewVideo(item)"
          />

          <image
            class="w-full h-full"
            :src="getFileTypeMapItem(item.url)?.thumb || item.url"
            :mode="imageMode"
            @click="
              disabled ? noop() : getFileTypeMapItem(item.url)?.handler(item)
            "
          />
        </view>
      </view>
    </view>

    <view
      v-if="!disabled"
      class="pro-upload__button flex flex-col justify-center gap-y-[10px] items-center bg-[#F4F5F7]"
      :class="{
        'border-gray-400 border-[1px] border-dashed': border,
        'rounded-[6px]': borderRadius
      }"
      :style="{ width, height }"
      @click="handleChooseFile"
    >
      <ProIcon
        size="26"
        :name="$attrs.uploadIcon || uploadIcon"
        :color="uploadIconColor"
      />
      <text v-if="uploadText" class="uv-upload__button__text">
        {{ uploadText }}
      </text>
    </view>

    <uv-preview-video ref="previewVideoRef" />

    <ProPopup
      ref="downloadProgressPopupRef"
      mode="bottom"
      round="10"
      :closeOnClickOverlay="false"
    >
      <view class="p-[20px]">
        <text class="text-[12px]"> 文件下载中... </text>
        <ProLineProgress
          class="mt-[10px]"
          showText
          :percentage="downloadProgress"
        />
      </view>
    </ProPopup>
  </view>
</template>

<script lang="ts" setup>
/*
 * 微信开发工具视频貌似播放黑屏，但是真机正常
 * */

import { throttle, noop } from 'lodash';
import { computed, watch, nextTick } from 'vue';

import { chooseFile, video } from './utils';

import ProLoadingIcon from '@/components/pro/ProLoadingIcon/ProLoadingIcon.vue';
import { usePreview } from '@/components/pro/ProUpload/hooks/usePreview';
import { useOss } from '@/hooks/useOss';
import { useVModel } from '@/hooks/useVModel';
import { getAssetsResource } from '@/utils';

defineOptions({ options: { virtualHost: true } });

const props = defineProps({
  imageMode: { type: String, default: 'aspectFill' }, // 预览上传的图片时的裁剪模式，和image组件mode属性一致

  disabled: Boolean,
  border: { type: Boolean, default: true }, // 是否展示边框
  borderRadius: { type: Boolean, default: true }, // 是否展示圆角

  uploadText: { type: String, default: '' }, // 选择区域的文字
  uploadIcon: { type: String, default: '' }, // 选择区域的图标，支持 uv-icon 内置的图标和 http 地址的图片
  uploadIconColor: { type: String, default: '#D3D4D6' }, // 传递给 ProIcon 的图标颜色，如果 uploadIcon 是 http 的图片则该属性无效

  width: { type: String, default: '80px' }, // 选择区域和文件列表每一项的宽度
  height: { type: String, default: '80px' }, // 选择区域和文件列表每一项的高度

  accept: { type: String, default: 'image' }, // all | file | media | image | video | historyImage（微信小程序） | historyVideo（微信小程序）
  multiple: Boolean, // 是否可以多选
  maxCount: { type: Number, default: 52 }, // 一次性可选的最大数量
  sourceType: { type: Array, default: () => ['album', 'camera'] }, // 从摄像头获取还是从相册获取，可单独选一项
  compressed: Boolean, // 是否压缩视频文件
  maxDuration: { type: Number, default: 10 }, // 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间
  camera: { type: String, default: 'back' }, // back 后置摄像头，front 前置摄像头
  extension: { type: Array, default: () => undefined }, // media没有该配置，根据文件拓展名(.png,.doc)过滤，每一项都不能是空字符串。默认不过滤
  crop: Boolean, // 只有image才有
  sizeType: { type: Array, default: () => ['original', 'compressed'] }, // 只有image才有， original 原图，compressed 压缩图，默认二者都有

  file: { type: Object, default: () => ({}) }, // 为文件列表的第一个文件
  files: {
    type: Array,
    default: () => []
  },
  maxSize: { type: Number, default: 10 * 1024 * 1024 }, // 单个文件大小
  maxFilesLength: { type: Number, default: 100 } // 文件列表最大个数
});
const emits = defineEmits(['remove', 'change']);

const STATUS_UPLOADING = 'uploading';
const STATUS_SUCCESS = 'success';
const STATUS_FAILED = 'failed';

const uploadIcon = computed(() =>
  props.accept !== 'image' ? 'plus' : 'camera-fill'
);

const fileList = useVModel(props, 'files', undefined, { passive: true });

watch(
  fileList,
  val => {
    emits('update:file', val[0]);
  },
  { deep: true }
);

watch(
  () => props.file,
  val => {
    fileList.value.splice(0, 1, val);
  },
  { deep: true }
);

const handleRemoveFile = (file, index) => {
  fileList.value.splice(index, 1);
  emits('remove', file, index);
};

const {
  downloadProgress,
  downloadProgressPopupRef,

  getFileTypeMapItem,
  previewVideoRef,
  handlePreviewVideo
} = usePreview({
  fileList,
  props
});
const { uploadFile, getPreviewUrl } = useOss();
const handleChooseFile = throttle(() => {
  if (props.disabled) return;

  chooseFile({
    accept: props.accept,
    multiple: props.multiple,
    sourceType: props.sourceType,
    compressed: props.compressed,
    maxDuration: props.maxDuration,
    sizeType: props.sizeType,
    camera: props.camera,
    maxCount: props.maxCount,
    extension: props.extension,
    crop: props.crop
  }).then(async list => {
    const fileListLength = fileList.value.length;

    const overSize = list.some(item => item.size > props.maxSize);
    if (overSize && list.length === 1) {
      uni.showToast({
        title: `文件大小不能超过${(props.maxSize / 1024 / 1024).toFixed(2)}M`,
        icon: 'none'
      });
      return;
    } else if (overSize && list.length > 1) {
      uni.showToast({
        title: `已自动过滤大小超过
        ${(props.maxSize / 1024 / 1024).toFixed(2)}M的文件`,
        icon: 'none'
      });
      list = list.filter(item => item.size > props.maxSize);
      if (list.length === 0) return;
    }

    fileList.value.push(
      ...list.map(file => {
        return {
          ...file,
          fileSize: file.size,
          status: STATUS_UPLOADING,
          message: '上传中'
        };
      })
    );

    for (const index in list) {
      const file = list[index];
      try {
        const filePath = await uploadFile('uom', file.url, file.name || '');
        const url = await getPreviewUrl(filePath);
        fileList.value.splice(
          fileListLength + (list.length === 1 ? 0 : index),
          1,
          {
            ...file,
            url,
            filePath,
            status: STATUS_SUCCESS,
            message: '上传成功'
          }
        );
      } catch {
        fileList.value.splice(
          fileListLength + (list.length === 1 ? 0 : index),
          1,
          {
            ...file,
            status: STATUS_FAILED,
            message: '上传失败'
          }
        );
      }
    }

    nextTick(() => {
      emits('change', fileList.value);
    });
  });
}, 1000);
</script>
