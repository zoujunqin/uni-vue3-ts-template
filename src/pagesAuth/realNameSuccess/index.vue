<template>
  <ProPage
    :showBack="false"
    class="hx-p-[156px_24px_0_24px] hx-bg-white"
    navbar-title="实名认证"
    show-navbar
  >
    <view class="hx-flex hx-items-center hx-justify-center hx-mb-[20px]">
      <image
        :src="import('@http/real-name-success/success-icon-blue.png')"
        class="hx-w-[32px] hx-h-[32px] hx-mr-[8px] hx-mt-[8px]"
      />
      <text class="hx-text-[30px] hx-font-[600] hx-leading-[30px]">
        认证成功
      </text>
    </view>

    <view class="hx-flex hx-items-center hx-justify-center hx-mb-[45px]">
      <image
        :src="import('@http/real-name-success/success-icon-green.png')"
        class="hx-w-[16px] hx-h-[16px] hx-mr-[4px]"
      />
      <text
        class="hx-text-text-color-tip hx-font-[600] hx-text-[14px] hx-leading-[14px]"
      >
        恭喜你，提交的实名信息认证成功~
      </text>
    </view>

    <view
      class="to-task-list-panel hx-flex hx-items-center hx-justify-between hx-p-[17px_12px] hx-rounded-[8px] hx-bg-no-repeat hx-bg-[length:100%_100%]"
    >
      <view>
        <view class="hx-flex hx-items-center hx-mb-[10px]">
          <text
            class="hx-mr-[4px] hx-text-[16px] hx-leading-[14px] hx-font-[600]"
          >
            任务列表
          </text>
          <view
            class="must hx-text-white hx-text-[10px] hx-leading-[16px] hx-p-[0_6px] hx-font-[500] hx-rounded-[8px_8px_8px_0]"
          >
            必看
          </view>
        </view>
        <text
          class="hx-text-text-color-tip hx-text-[13px] hx-leading-[13px] hx-font-[400]"
        >
          立即查看任务列表吧~
        </text>
      </view>

      <ProButton type="primary" @tap="toTaskCenter">立即查看</ProButton>
    </view>
  </ProPage>
</template>

<script lang="ts" setup>
const toTaskCenter = () => {
  uni.reLaunch({ url: '/pages/portal/index' });
};
</script>

<style lang="scss" scoped>
.to-task-list-panel {
  background-image: url($http + '/real-name-success/bg.png');
}

.must {
  background: linear-gradient(255deg, #ffd6ae 10.72%, #ff195b 100%);
}

:deep(.pro-button button) {
  padding: 7px 16px;
  font-size: 12px !important;
  font-weight: 600;
  border-radius: 100px !important;
}
</style>
