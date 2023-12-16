import { PropType } from 'vue';

export const pageHeaderProps = {
  tabIndex: {
    type: Number,
    default: 0
  },
  tabList: {
    type: Array as PropType<{ name: string }[]>,
    default: () => []
  },
  bgImgUrl: {
    type: String,
    default: null
  },
  showInput: {
    type: Boolean,
    default: true
  },
  showTabList: {
    type: Boolean,
    default: true
  },
  showCondition: Boolean
} as const;
