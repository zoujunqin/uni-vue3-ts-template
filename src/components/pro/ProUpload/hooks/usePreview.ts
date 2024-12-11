import { cloneDeep, noop, throttle } from 'lodash';
import { ref } from 'vue';

import {
  excel,
  image,
  pdf,
  video,
  word
} from '@/components/pro/ProUpload/utils';
import { getAssetsResource } from '@/utils';

export const usePreview = ({ fileList, props }) => {
  const handlePreviewImage = throttle(file => {
    const newFileList = cloneDeep(fileList.value).filter(file =>
      image(file.url)
    );
    uni.previewImage({
      urls: newFileList.map(item => item.url),
      current: newFileList.findIndex(item => item.url === file.url),
      fail() {
        uni.showToast({ title: '预览图片失败', icon: 'none' });
      }
    });
  }, 1000);

  const previewVideoRef = ref();
  const handlePreviewVideo = throttle(file => {
    previewVideoRef.value.open(file.url);
  }, 1000);

  const proOfficePreviewRef = ref();
  const handlePreviewOffice = throttle(
    file => proOfficePreviewRef.value?.openDocument(file.url),
    1000
  );

  const fileTypeMap = new Map([
    [
      image,
      { thumb: null, handler: props.disabled ? noop : handlePreviewImage }
    ],
    [
      video,
      { thumb: null, handler: props.disabled ? noop : handlePreviewVideo }
    ],
    [
      word,
      {
        thumb: getAssetsResource('@http/upload/word.svg'),
        handler: props.disabled ? noop : handlePreviewOffice
      }
    ],
    [
      excel,
      {
        thumb: getAssetsResource('@http/upload/excel.svg'),
        handler: props.disabled ? noop : handlePreviewOffice
      }
    ],
    [
      pdf,
      {
        thumb: getAssetsResource('@http/upload/pdf.svg'),
        handler: props.disabled ? noop : handlePreviewOffice
      }
    ],
    [
      () => true,
      { thumb: getAssetsResource('@http/upload/file.svg'), handler: noop }
    ]
  ]);

  const getFileTypeMapItem = url => {
    return [...fileTypeMap].find(([key]) => key(url))[1];
  };

  return {
    proOfficePreviewRef,

    fileTypeMap,
    getFileTypeMapItem,

    previewVideoRef,
    handlePreviewVideo
  };
};
