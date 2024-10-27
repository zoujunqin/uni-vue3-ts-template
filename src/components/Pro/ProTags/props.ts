import { PropType } from 'vue';

export const tagProps = {
  size: {
    type: String as PropType<'large' | 'medium' | 'mini'>,
    default: 'medium'
  },
  type: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'error' | 'info' | 'disabled'
    >,
    default: 'primary'
  }
};
