import { defineConstants } from '@/utils/constant';

export const { TASK_STATUS, TASK_STATUS_MAP, TASK_STATUS_LIST } =
  defineConstants(
    [
      {
        label: '待确认',
        value: 'wait_confirm',
        type: 'warning'
      },
      {
        label: '承接中',
        value: 'accepted',
        type: 'success'
      },
      {
        label: '已完结',
        value: 'completed',
        type: 'disabled'
      }
    ] as const,
    'TASK_STATUS',
    'value'
  );

//申述处理状态
export const { APPLY_STATUS, APPLY_STATUS_MAP, APPLY_STATUS_LIST } =
  defineConstants(
    [
      {
        label: '申述中',
        value: 'to_be_processed',
        className: 'warning-fixed-tip',
        textColor: 'warning-text-color',
        getTip: () => '申述中：正在申述请耐心等待～'
      },
      {
        label: '通过',
        value: 'passed',
        className: '',
        textColor: 'passed-text-color',
        getTip: () => ''
      },
      {
        label: '驳回',
        value: 'reject',
        className: 'error-fixed-tip',
        textColor: 'error-text-color',
        getTip: cause => `申诉失败：原因(${cause})`
      }
    ] as const,
    'APPLY_STATUS',
    'value'
  );
//实名认证信息
export const { REAL_TYPE, REAL_TYPE_MAP, REAL_TYPE_LIST } = defineConstants(
  [
    {
      label: '上传身份证',
      value: 'id_card'
    },
    {
      label: '银行信息',
      value: 'bank_info'
    },
    {
      label: '基本信息',
      value: 'base_info'
    },
    {
      label: '资质信息',
      value: 'certification_info'
    }
  ] as const,
  'REAL_TYPE',
  'value'
);

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
//协议签署类型
export const { PROTOCOL_TYPE, PROTOCOL_TYPE_MAP, PROTOCOL_TYPE_LIST } =
  defineConstants(
    [
      {
        label: '邀请码',
        value: 'invitation_code'
      },
      {
        label: '订单详情',
        value: 'order_detail'
      },
      {
        label: '任务',
        value: 'task'
      }
    ] as const,
    'PROTOCOL_TYPE',
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
        pagePath: '/pagesAuth/contractSign/index'
      }
    ] as const,
    'REAL_STATUS',
    'value'
  );
