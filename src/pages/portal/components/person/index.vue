<template>
  <view>
    <ProModal
      ref="logoutModalRef"
      confirm-button-text="确认"
      content="确认退出登录?"
      title="退出登录"
      @confirm="handleLogoutConfirm"
    >
      <template #image>
        <image
          :src="getAssetsResource('@http/person/log-out-img.png')"
          class="hx-w-full hx-h-[94px]"
        />
      </template>
    </ProModal>

    <ProModal
      ref="contactModalRef"
      confirm-button-text="联系我们"
      content="0591 - 87809851"
      title="联系我们"
      @confirm="handleContactConfirm('0591 - 87809851')"
    >
      <template #image>
        <image
          :src="getAssetsResource('@http/person/connection-bg.png')"
          class="hx-w-full hx-h-[116px]"
        />
      </template>
    </ProModal>

    <view
      :style="`background-image: url(${getAssetsResource(
        '@http/person/nav-bar-bg.svg'
      )});`"
      class="page-pt-with-navbar hx-pl-[8px] hx-pr-[8px] hx-bg-[length:100%_432px] hx-bg-no-repeat"
    >
      <view
        class="hx-flex hx-items-center hx-justify-between hx-pl-[8px] hx-pr-[8px] hx-mt-[12px] hx-mb-[20px]"
      >
        <view class="hx-flex hx-flex-1" @click="handleToLoginPage">
          <view class="img-box">
            <image
              :src="getAssetsResource('@http/person/avatar-default.svg')"
              class="hx-w-[54px] hx-h-[54px] hx-rounded-full"
            />
          </view>
          <view class="hx-flex hx-flex-col hx-justify-center">
            <text
              class="hx-mb-[4px] hx-text-color-title hx-text-font-size-title hx-font-[600] hx-leading-[28px]"
            >
              {{ token ? userInfo?.workerName : '未登录' }}
            </text>
            <text
              class="hx-text-text-color hx-text-font-size-base hx-leading-[20px] hx-font-[500]"
            >
              {{ token ? userInfo?.mobile : '点击登录，查看更多信息' }}
            </text>
          </view>
        </view>
        <view
          class="hx-h-[30px] hx-w-[98px] hx-flex hx-items-center hx-justify-between hx-p-[8px_16px] hx-rounded-[15px] hx-shadow-button"
          v-if="token"
          @click="logout"
        >
          <image
            :src="getAssetsResource('@http/person/exit.svg')"
            class="hx-w-[14px] hx-h-[14px] hx-mr-[4px]"
          />
          <text
            class="hx-text-font-size-sm hx-leading-[20px] hx-text-text-color"
          >
            退出登录
          </text>
        </view>
      </view>

      <view
        class="hx-h-[88px] hx-p-[16px] hx-flex hx-items-center hx-justify-between hx-bg-white hx-rounded-[8px] hx-shadow-card hx-mb-[10px]"
      >
        <view
          v-for="(item, index) in panelItemList"
          :key="index"
          class="hx-h-[56px] hx-flex hx-flex-col hx-items-center"
          @click="panelItemMap[item.type]?.handler"
        >
          <view class="hx-relative">
            <image
              :src="item.icon"
              class="hx-w-[36px] hx-h-[36px] hx-mb-[8px]"
            />
            <ProBadge :value="item.badge" absolute />
          </view>

          <text
            class="hx-text-font-size-base hx-text-color-title hx-font-[500] hx-leading-[20px]"
          >
            {{ item.name }}
          </text>
        </view>
      </view>

      <view
        class="hx-bg-white hx-rounded-[8px] hx-pl-[12px] hx-pr-[12px] hx-mb-[10px] hx-pt-[16px]"
      >
        <vertical-list-item
          v-for="(item, index) in firstVerticalList"
          :key="index"
          :data="item"
          :listLength="firstVerticalList.length"
          class="hx-pb-[16px]"
          @click="verticalListItemMap[item.type]?.handler"
        />
      </view>
      <view
        class="hx-bg-white hx-rounded-[8px] hx-pl-[12px] hx-pr-[12px] hx-pt-[16px]"
      >
        <vertical-list-item
          v-for="(item, index) in secondVerticalList"
          :key="index"
          :data="item"
          :listLength="secondVerticalList.length"
          class="hx-pb-[16px]"
          @click="verticalListItemMap[item.type]?.handler"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

import VerticalListItem from './components/VerticalListItem.vue';
import { useHandler } from './hooks/useHandler';

// import { useTokenWatch } from '@/hooks/useTokenWatch';
import { useTokenWatch } from '@/hooks/useTokenWatch';
import { useUserStore } from '@/pinia/modules/user';
import { getAssetsResource } from '@/utils';

const { token, userInfo } = storeToRefs(useUserStore());

const {
  contactModalRef,
  logoutModalRef,
  logout,
  handleLogoutConfirm,
  handleContactConfirm,
  panelItemMap,
  verticalListItemMap,

  handleToLoginPage
} = useHandler();

const panelItemList = computed(() => {
  return [
    {
      type: panelItemMap.personInfo.type,
      icon: getAssetsResource('@http/person/info-icon.svg'),
      name: '个人信息',
      badge: `${userInfo.value?.izRealNameAuthenticationName || ''}`
    },
    {
      type: panelItemMap.bankCard.type,
      icon: getAssetsResource('@http/person/bank-card-icon.svg'),
      name: '银行卡',
      badge: '已绑定'
    },
    {
      type: panelItemMap.contract.type,
      icon: getAssetsResource('@http/person/contract-icon.svg'),
      name: '我的合同',
      badge: ''
    },
    {
      type: panelItemMap.myInsurance.type,
      icon: getAssetsResource('@http/person/security-icon.svg'),
      name: '我的商保',
      badge: ''
    }
  ];
});

const firstVerticalList = computed(() => {
  return [
    {
      index: 0,
      type: verticalListItemMap.remuneration.type,
      icon: getAssetsResource('@http/person/remuneration-icon.svg'),
      desc: '累计报酬(元)',
      text: `¥${userInfo.value?.totalAmount || 0}`
    },
    {
      index: 1,
      type: verticalListItemMap.agreement.type,
      icon: getAssetsResource('@http/person/agreement-icon.svg'),
      desc: '用户隐私协议'
    }
  ];
});

const secondVerticalList = [
  {
    index: 0,
    type: verticalListItemMap.contact.type,
    icon: getAssetsResource('@http/person/contact-icon.svg'),
    desc: '联系我们'
  }
];

const getUserInfo = () => {
  if (token.value) {
    useUserStore().setUserInfo();
  }
};

useTokenWatch({ hasTokenCb: getUserInfo });

onMounted(() => {
  getUserInfo();
});
</script>
<script lang="ts">
export default {
  options: {
    name: 'PersonCenter',
    virtualHost: false,
    styleIsolation: 'shared'
  }
};
</script>

<style scoped>
:deep(.hx-relative .uv-badge) {
  top: 0 !important;
  right: 0 !important;
  height: unset;
  padding: 3px 6px;
  font-size: 10px;
  line-height: 8px;
  white-space: nowrap;
  background-color: #f7534f;
  border-radius: 6px 0 4px !important;
  transform: translate(80%, -50%);
}
</style>

<style lang="scss" scoped>
.img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border: 3px solid #fff;
  border-radius: 50%;
}
</style>
