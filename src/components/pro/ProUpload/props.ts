import { PropType } from 'vue';

import { BACKGROUND_NAMES, FILE, IMAGE } from './const';

export const uploadProps = {
  readonly: Boolean,

  uploadType: {
    type: String as PropType<typeof FILE | typeof IMAGE>,
    default: IMAGE
  },

  /* uploadType 为 image 时的背景图片 */
  backgroundName: {
    type: String as PropType<(typeof BACKGROUND_NAMES)[number]>,
    default: BACKGROUND_NAMES[0]
  },

  /* 是否使用 oss  */
  useOss: {
    type: Boolean,
    default: true
  },

  /* 上传按钮标题 */
  uploadButtonTitle: {
    type: String,
    default: '点击上传国徽面'
  },

  /* 文件地址 */
  modelValue: {
    type: String,
    default: ''
  },

  /* 上传成功后需要特别处理的钩子, 返回 Boolean 类型 */
  doAfterUploadSuccess: {
    type: Function,
    default: () => true
  }
};