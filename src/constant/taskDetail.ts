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
