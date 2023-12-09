export const NETWORK_ERROR = 'networkError';
export const NO_MSG = 'noMsg';
export const NO_PAGE_INFO = 'noPageInfo';
export const EMPTY_DATA = 'emptyData';
export const NO_ADDRESS = 'noAddress';

export const typeMap = {
  [NETWORK_ERROR]: {
    title: '哎呀！网络出问题了',
    subTitle: '网络不给力，请检查您的网络设置',
    image: import('@/static@http/placeholder/network-error.png')
  },
  [NO_MSG]: {
    title: '暂时无消息！',
    subTitle: '没有新的消息，在等等...',
    image: import('@/static@http/placeholder/no-msg.png')
  },
  [NO_PAGE_INFO]: {
    title: '哎呦！页面信息飞走了',
    subTitle: '不好意思，页面君飞走了~',
    image: import('@/static@http/placeholder/no-page-info.png')
  },
  [EMPTY_DATA]: {
    title: '没有搜索到',
    subTitle: '被您难倒了，换个词试试看~',
    image: import('@/static@http/placeholder/empty-data.png')
  },
  [NO_ADDRESS]: {
    title: '暂无地址信息',
    subTitle: '暂无地址信息，去添加地址~',
    image: import('@/static@http/placeholder/no-address.png')
  }
} as const;

export const buttonMap = {
  /* 刷新按钮 */
  refresh: (type: keyof typeof typeMap) =>
    [NETWORK_ERROR, NO_PAGE_INFO].includes(type),
  /* 检查网络 */
  checkNetwork: (type: keyof typeof typeMap) => [NETWORK_ERROR].includes(type)
};
