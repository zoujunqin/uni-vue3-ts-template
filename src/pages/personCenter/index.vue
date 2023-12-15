<template>
  <ProModal
    ref="logoutModalRef"
    title="退出登录"
    content="确认退出登录?"
    confirm-button-text="确认"
    @confirm="handleLogoutConfirm"
  />
  <ProModal
    ref="contactModalRef"
    title="联系我们"
    content="(0591) - 40006464"
    confirm-button-text="联系我们"
    @confirm="handleContactConfirm('(0591) - 40006464')"
  />
  <ProPage
    show-tabbar
    class="page-pt-with-navbar hx-pl-[8px] hx-pr-[8px] hx-bg-[length:100%_432px] hx-bg-no-repeat"
    :style="`background-image: url(${import('@http/person/nav-bar-bg.png')});`"
  >
    <view
      class="hx-flex hx-items-center hx-justify-between hx-pl-[8px] hx-pr-[8px] hx-mt-[12px] hx-mb-[20px]"
    >
      <view class="hx-flex hx-flex-1">
        <image
          class="hx-w-[60px] hx-h-[60px] hx-mr-[12px]"
          src="@/static/person/avatar-default.png"
        />
        <view class="hx-flex hx-flex-col hx-justify-center">
          <text
            class="hx-mb-[4px] hx-text-color-title hx-text-font-size-title hx-font-[600] hx-leading-[28px]"
          >
            未登录
          </text>
          <text
            class="hx-text-text-color hx-text-font-size-base hx-leading-[20px] hx-font-[500]"
          >
            点击登录，查看更多信息
          </text>
        </view>
      </view>
      <view
        class="hx-h-[30px] hx-w-[98px] hx-flex hx-items-center hx-justify-between hx-p-[8px_16px] hx-rounded-[15px] hx-shadow-button"
        @click="logout"
      >
        <image
          class="hx-w-[14px] hx-h-[14px] hx-mr-[4px]"
          src="@/static/person/exit.png"
        />
        <text class="hx-text-font-size-sm hx-leading-[20px] hx-text-text-color">
          退出登录
        </text>
      </view>
    </view>

    <view
      class="hx-p-[16px] hx-flex hx-items-center hx-justify-between hx-bg-white hx-rounded-[8px] hx-shadow-card hx-mb-[10px]"
    >
      <view
        class="hx-h-[56px] hx-flex hx-flex-col hx-items-center"
        v-for="(item, index) in panelItemList"
        :key="index"
        @click="panelItemMap[item.type]?.handler"
      >
        <view class="hx-relative">
          <image class="hx-w-[28px] hx-h-[28px] hx-mb-[8px]" :src="item.icon" />
          <uv-badge :value="item.badge" absolute />
        </view>

        <text
          class="hx-text-font-size-base hx-text-color-title hx-font-[500] hx-leading-[20px]"
        >
          {{ item.name }}
        </text>
      </view>
    </view>

    <view
      class="hx-bg-white hx-rounded-[8px] hx-pl-[12px] hx-pr-[12px] hx-mb-[10px]"
    >
      <vertical-list-item
        v-for="(item, index) in firstVerticalList"
        :key="index"
        :data="item"
        class="hx-pt-[16px] hx-pb-[16px]"
        @click="verticalListItemMap[item.type]?.handler"
      />
    </view>
    <view class="hx-bg-white hx-rounded-[8px] hx-pl-[12px] hx-pr-[12px]">
      <vertical-list-item
        v-for="(item, index) in secondVerticalList"
        :key="index"
        :data="item"
        class="hx-pt-[16px] hx-pb-[16px]"
        @click="verticalListItemMap[item.type]?.handler"
      />
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import VerticalListItem from './components/VerticalListItem.vue';
import { useHandler } from './hooks/useHandler';

import AgreementIcon from '@/static/person/agreement-icon.png';
import BankCardIcon from '@/static/person/bank-card-icon.png';
import ContactIcon from '@/static/person/contact-icon.png';
import ContractIcon from '@/static/person/contract-icon.png';
import InfoIcon from '@/static/person/info-icon.png';
import RemunerationIcon from '@/static/person/remuneration-icon.png';
import SecurityIcon from '@/static/person/security-icon.png';
import ShareIcon from '@/static/person/share-icon.png';

const {
  contactModalRef,
  logoutModalRef,
  logout,
  handleLogoutConfirm,
  handleContactConfirm,
  panelItemMap,
  verticalListItemMap
} = useHandler();

const panelItemList = [
  {
    type: panelItemMap.personInfo.type,
    icon: InfoIcon,
    name: '个人信息',
    badge: '已实名'
  },
  {
    type: panelItemMap.bankCard.type,
    icon: BankCardIcon,
    name: '银行卡',
    badge: '已绑定'
  },
  {
    type: panelItemMap.contract.type,
    icon: ContractIcon,
    name: '我的合同',
    badge: ''
  },
  {
    type: panelItemMap.myInsurance.type,
    icon: SecurityIcon,
    name: '我的商保',
    badge: ''
  }
];

const firstVerticalList = [
  {
    type: verticalListItemMap.remuneration.type,
    icon: RemunerationIcon,
    desc: '累计报酬(元)',
    text: '￥589.00'
  },
  {
    type: verticalListItemMap.agreement.type,
    icon: AgreementIcon,
    desc: '用户隐私协议'
  },
  {
    type: verticalListItemMap.share.type,
    icon: ShareIcon,
    desc: '分享小程序'
  }
];

const secondVerticalList = [
  {
    type: verticalListItemMap.contact.type,
    icon: ContactIcon,
    desc: '联系我们'
  }
];
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

<style>
/* stylelint-disable-next-line */
page {
  background: linear-gradient(180deg, #fff 18.25%, #f7f8fa 92.19%);
}
</style>
