import { computed, ref } from 'vue';

import { postWorkerProtocolSign } from '@/api/fe/wechat/worker';
import {
  PROTOCOL_TYPE,
  REAL_STATUS_MAP,
  REAL_STATUS
} from '@/constant/taskDetail';

export const handleRealStatusTo = (realStatus, params) => {
  if (realStatus === REAL_STATUS.NEED_SIGN) {
    const paramsData = params.split('=')[1];
    const query = JSON.parse(paramsData);
    getWorkerProtocolSign(query);
  } else {
    uni.navigateTo({
      url: REAL_STATUS_MAP[realStatus].pagePath + params
    });
  }
};

export const getWorkerProtocolSign = query => {
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
  const pluginUrls = ref([]);
  //签署份数
  const count = ref(1);
  const env = import.meta.env.VITE_COMTRACT_LOCK_ENV;
  postWorkerProtocolSign(params)
    .then(res => {
      pluginUrls.value = res;
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
  const lockUrl = computed(() => {
    return `plugin://qyssdk-plugin/doc?ticket=${
      pluginUrls.value[count.value - 1]
    }&env=${env}&hasCb=true`;
  });
  const signSuccessCb = channel => {
    if (pluginUrls.value.length === count.value) {
      channel.emit('jumpTo', `/pagesAuth/realNameSuccess/index`);
    } else {
      handleContinueToSign();
    }
  };
  let eventChannel = null;

  const handlePlugin = () => {
    uni.navigateTo({
      url: lockUrl.value,
      events: {
        signSuccessCb: () => signSuccessCb(eventChannel)
      },
      success(res) {
        eventChannel = res.eventChannel;
      }
    });
  };
  const handleContinueToSign = () => {
    count.value++;
    eventChannel.emit('jumpTo', lockUrl.value, {
      signSuccessCb
    });
  };
};
