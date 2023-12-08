import { PropType } from 'vue';
import { FILE, IMAGE, BACKGROUND_NAMES } from './const';

export const uploadProps = {
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
  }
};
