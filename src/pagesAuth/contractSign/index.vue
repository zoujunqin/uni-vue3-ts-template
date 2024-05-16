<template>
  <web-view :src="signUrl" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { shallowRef } from 'vue';

import { postWorkerProtocolSign } from '@/api/fe/wechat/worker';
import { PROTOCOL_TYPE } from '@/constant/taskDetail';

const signUrl = shallowRef('');
const callbackPage = 'http://47.96.112.174:8003/';

const getWorkerProtocolSign = query => {
  const { sourceType, orderDetailId, taskId, invitationCodeId } = query;
  const idMap = {
    [PROTOCOL_TYPE.ORDER_DETAIL]: orderDetailId,
    [PROTOCOL_TYPE.TASK]: taskId,
    [PROTOCOL_TYPE.INVITATION_CODE]: invitationCodeId
  };
  const params = {
    callbackPage,
    id: idMap[sourceType],
    sourceType
  };
  postWorkerProtocolSign(params)
    .then(res => {
      signUrl.value = res;
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
