<template>
  <web-view :src="signUrl" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { shallowRef } from 'vue';

import { postWorkerProtocolSign } from '@/api/fe/wechat/worker';
import { PROTOCOL_TYPE } from '@/constant/taskDetail';

const signUrl = shallowRef('');

const getWorkerProtocolSign = query => {
  const { sourceType, orderDetailId, taskId, invitationCodeId } = query;
  const idMap = {
    [PROTOCOL_TYPE.ORDER_DETAIL]: orderDetailId,
    [PROTOCOL_TYPE.TASK]: taskId,
    [PROTOCOL_TYPE.INVITATION_CODE]: invitationCodeId
  };
  const params = {
    callbackPage: import.meta.env.VITE_REALNAME_SUCCESS_CALLBACK,
    id: idMap[sourceType],
    sourceType
  };
  postWorkerProtocolSign(params)
    .then(res => {
      /* 在正式环境小程序需要配置域名的验证，契约锁无法支持，通过自己的 h5 唤起契约锁的 h5 */
      signUrl.value = import.meta.env.VITE_QIYUESUO_LINK + `?signUrl=${res}`;
    })
    .catch(err => {
      uni.showModal({
        title: '提示',
        content: err.response.data.message,
        showCancel: false,
        success: res => {
          if (res.confirm) {
            uni.navigateBack();
          }
        }
      });
    });
};

onLoad(({ taskQueryParams = {} }) => {
  getWorkerProtocolSign(JSON.parse(taskQueryParams));
});
</script>
