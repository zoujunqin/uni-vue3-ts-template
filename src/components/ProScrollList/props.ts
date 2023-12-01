export const scrollListProps = {
  /* 两个 index 用于多个 tab 联动时实现懒加载 */
  initialIndex: {
    type: Number,
    default: 0
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  /* 请求接口 */
  fetch: {
    type: Function,
    default: async () => {}
  },
  /* 请求接口拓展参数 */
  extendParams: {
    type: Object,
    default: () => ({})
  }
};
