function pickExclude(obj, keys) {
  if (
    !['[object Object]', '[object File]'].includes(
      Object.prototype.toString.call(obj)
    )
  ) {
    return {};
  }
  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}

function formatImage(res) {
  return res.tempFiles.map(item => ({
    ...pickExclude(item, ['path']),
    type: 'image',
    url: item.path,
    thumb: item.path,
    size: item.size,
    // #ifdef H5
    name: item.name
    // #endif
  }));
}

function formatVideo(res) {
  return [
    {
      ...pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
      type: 'video',
      url: res.tempFilePath,
      thumb: res.thumbTempFilePath,
      size: res.size,
      // #ifdef H5
      name: res.name
      // #endif
    }
  ];
}

function formatMedia(res) {
  return res.tempFiles.map(item => ({
    ...pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
    type: res.type,
    url: item.tempFilePath,
    thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
    size: item.size
  }));
}

function formatFile(res) {
  return res.tempFiles.map(item => ({
    ...pickExclude(item, ['path']),
    url: item.path,
    size: item.size,
    // #ifdef H5
    name: item.name,
    type: item.type
    // #endif
  }));
}
export function chooseFile({
  accept,
  multiple,
  sourceType,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount,
  extension,
  crop
}) {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case 'image':
        uni.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType,
          sizeType,
          extension,
          crop,
          success: res => resolve(formatImage(res)),
          fail: reject
        });
        break;
      // #ifdef MP-WEIXIN
      // 只有微信小程序才支持chooseMedia接口
      case 'media':
        uni.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType,
          maxDuration,
          sizeType,
          camera,
          success: res => resolve(formatMedia(res)),
          fail: reject
        });
        break;
      // #endif
      case 'video':
        uni.chooseVideo({
          sourceType,
          compressed,
          maxDuration,
          camera,
          extension,
          success: res => resolve(formatVideo(res)),
          fail: reject
        });
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        let choose, type;

        /* #ifdef MP-WEIXIN */
        choose = uni.chooseMessageFile;
        type = accept.replace('history', '').toLowerCase();
        /* #endif */

        /* #ifndef MP-WEIXIN */
        choose = uni.chooseFile;
        type = accept === 'file' ? 'all' : accept;
        /* #endif */

        choose({
          count: multiple ? maxCount : 1,
          type,
          extension,
          success: res => resolve(formatFile(res)),
          fail: reject
        });
    }
  });
}

export function image(value = '') {
  const newValue = value.split('?')[0];
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}

export function video(value = '') {
  const newValue = value.split('?')[0];
  const VIDEO_REGEXP =
    /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(newValue);
}

export function word(value = '') {
  const newValue = value.split('?')[0];
  const WORD_REGEXP = /\.(doc|docx)/i;
  return WORD_REGEXP.test(newValue);
}

export function excel(value = '') {
  const newValue = value.split('?')[0];
  const EXCEL_REGEXP = /\.(xls|xlsx)/i;
  return EXCEL_REGEXP.test(newValue);
}

export function pdf(value = '') {
  const newValue = value.split('?')[0];
  const PDF_REGEXP = /\.pdf/i;
  return PDF_REGEXP.test(newValue);
}
