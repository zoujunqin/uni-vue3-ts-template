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

  const downloadProgressPopupRef = ref();
  const downloadProgress = ref(0);
  function openDocument(url) {
    downloadProgressPopupRef.value.open();
    let downloadTask = uni.downloadFile({
      url,
      success(res) {
        uni.openDocument({
          filePath: res.tempFilePath,
          fail() {
            uni.showToast({ title: '文件打开失败', icon: 'none' });
          }
        });
      },
      fail() {
        uni.showToast({ title: '文件下载失败', icon: 'none' });
      },
      complete() {
        downloadTask = null;
        downloadProgress.value = 0;
        downloadProgressPopupRef.value.close();
      }
    });

    downloadTask?.onProgressUpdate(({ progress }) => {
      downloadProgress.value = progress;
    });
  }

  const handlePreviewOffice = throttle(file => openDocument(file.url), 1000);

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
    downloadProgress,
    downloadProgressPopupRef,

    fileTypeMap,
    getFileTypeMapItem,

    previewVideoRef,
    handlePreviewVideo
  };
};
