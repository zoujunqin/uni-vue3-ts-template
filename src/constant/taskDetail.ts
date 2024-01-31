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
        label: '待处理',
        value: 'to_be_processed',
        className: 'warning-fixed-tip'
      },
      {
        label: '通过',
        value: 'passed',
        className: ''
      },
      {
        label: '驳回',
        value: 'reject',
        className: 'error-fixed-tip'
      }
    ] as const,
    'APPLY_STATUS',
    'value'
  );
//实名认证信息
export const { REAL_TYPE, REAL_TYPE_MAP, REAL_TYPE_LIST } = defineConstants(
  [
    {
      label: '银行信息',
      value: 'bank_info'
    },
    {
      label: '员工信息',
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
        value: 'yes'
      },
      {
        label: '否',
        value: 'no'
      }
    ] as const,
    'YES_NO_TYPE',
    'value'
  );
