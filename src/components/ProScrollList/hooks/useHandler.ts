import { AxiosError } from 'axios';
import { ExtractPropTypes, onMounted, shallowRef, toRef } from 'vue';

import { scrollListProps } from '../props';

import { useFirst } from '@/hooks/useFirst';

export const useHandler = (props: ExtractPropTypes<typeof scrollListProps>) => {
  const zPagingRef = shallowRef();
  const dataList = shallowRef([]);

  const handleQuery = (page: number, pageSize: number) => {
    /* 缓存 total 用于超时 */
    let cacheTotal = 0;
    const params = Object.assign({ page, pageSize }, props.extendParams);

    props
      .fetch(params)
      .then((data: any) => {
        const { records = [], total = 0 } = data;
        cacheTotal = total;
        zPagingRef.value.complete(records, total);
      })
      .catch((err: AxiosError) => {
        const { code } = err;

        /* 超时不清空现有的数据 */
        if (code === AxiosError.ETIMEDOUT) {
          const { realTotalData } = zPagingRef.value;
          const data = page === 1 ? realTotalData : [];
          zPagingRef.value.complete(data, cacheTotal);
        } else {
          zPagingRef.value.complete();
        }
      });
  };

  onMounted(() => {
    if (!props.autoLoad) {
      return;
    }
    useFirst(
      toRef(props, 'initialIndex'),
      toRef(props, 'currentIndex'),
      zPagingRef.value.reload
    );
  });

  return {
    zPagingRef,
    dataList,
    handleQuery
  };
};
