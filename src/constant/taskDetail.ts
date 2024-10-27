import { defineConstants } from '@/utils/constant';

//yes/no
export const { YES_NO_TYPE, YES_NO_TYPE_MAP, YES_NO_TYPE_LIST } =
  defineConstants(
    [
      {
        label: '是',
        bindLabel: '已绑定',
        value: 'yes'
      },
      {
        label: '否',
        bindLabel: '未绑定',
        value: 'no'
      }
    ] as const,
    'YES_NO_TYPE',
    'value'
  );

// 实名状态
export const { REAL_STATUS, REAL_STATUS_MAP, REAL_STATUS_LIST } =
  defineConstants(
    [
      {
        label: '已经实名',
        value: 'already_real',
        pagePath: '/pages/portal/index'
      },
      {
        label: '需要实名认证',
        value: 'need_real',
        pagePath: '/pagesAuth/realName/index'
      },
      {
        label: '需要合同签署',
        value: 'need_sign',
        pagePath: ''
      }
    ] as const,
    'REAL_STATUS',
    'value'
  );
