import { defineConstants } from '@/utils/constant';

export const { BANK_STATUS, BANK_STATUS_MAP, BANK_STATUS_LIST } =
  defineConstants(
    [
      {
        label: '已绑定',
        value: 'yes'
      },
      {
        label: '未绑定',
        value: 'no'
      }
    ] as const,
    'BANK_STATUS',
    'value'
  );
