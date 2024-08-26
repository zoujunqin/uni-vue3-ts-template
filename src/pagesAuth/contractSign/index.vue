<template>
  <div />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

import { postWorkerProtocolSign } from '@/api/fe/wechat/worker';
import { PROTOCOL_TYPE } from '@/constant/taskDetail';
const getWorkerProtocolSign = query => {
  const pluginUrl = ref([]);
  //签署份数
  const count = ref(1);
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
      pluginUrl.value = res;
      handlePlugin();
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
  const handlePlugin = () => {
    let eventChannel = null;
    const env = 'cn';
    uni.navigateTo({
      url: `plugin://qyssdk-plugin/doc?ticket=${pluginUrl.value[0]}&env=${env}&hasCb=true`,
      events: {
        signSuccessCb: () => {
          handleContinueToSign(eventChannel, env);
        }
      },
      success(res) {
        eventChannel = res.eventChannel;
      }
    });
  };
  const handleContinueToSign = (eventChannel, env) => {
    const eventChannelTo = eventChannel;
    const envTo = env;
    count.value++;
    eventChannelTo.emit(
      'jumpTo',
      `plugin://qyssdk-plugin/doc?ticket=${
        pluginUrl.value[count.value - 1]
      }&env=${envTo}&hasCb=true`,
      {
        signSuccessCb: eventChannel => {
          if (count.value === pluginUrl.value.length) {
            eventChannel.emit('jumpTo', `/pages/portal/index`);
          } else {
            handleContinueToSign(eventChannel, envTo);
          }
        }
      }
    );
  };
};
onLoad(({ taskQueryParams = {} }) => {
  getWorkerProtocolSign(JSON.parse(taskQueryParams));
});
</script>
