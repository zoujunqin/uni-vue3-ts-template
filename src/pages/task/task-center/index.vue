<template>
  <pro-page
    show-navbar
    show-tabbar
    navbar-title="任务中心"
    class="hx-bg-[#F7F8FA] hx-flex hx-flex-col"
  >
    <pro-page-header
      class="hx-relative hx-z-10"
      :tab-list="tabList"
      :bg-img-url="import('@@static/task/task-bg.png')"
      @tab-change="handleTabChange"
    />

    <swiper :current="tabIndex" class="hx-flex-1">
      <swiper-item v-for="(taskList, index) in swiperList" :key="index">
        <scroll-view
          scroll-y="true"
          class="hx-h-full hx-pb-[10px] hx-box-border"
          @scrolltolower="() => {}"
        >
          <pro-task-card
            class="hx-mt-[10px]"
            v-for="(item, index) in taskList"
            :key="index"
            :card-info="item"
          />
        </scroll-view>
      </swiper-item>
    </swiper>
  </pro-page>
</template>
<script setup lang="ts">
import { useHandler } from '@/pages/task/task-center/hooks/useHandler';

const { tabIndex, handleTabChange } = useHandler();
const tabList = [
  {
    name: '待确认'
  },
  {
    name: '承接中'
  },
  {
    name: '已完结'
  }
];
const willCardList = [
  {
    title: '信息软件开发',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  }
];
const processingCardList = [
  {
    title: '信息软件开发423',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发423',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发423',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发423',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发423',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '信息软件开发423',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  }
];
const completedCardList = [
  {
    title: '787',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '787',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '787',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '787',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '787',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  },
  {
    title: '787',
    tag: '软件和信息技术行业',
    desc: '专业技能go语言、相关经验0-3年、性格特点开朗活泼专业专业技能go语言、相关经验0-3年、性格特点开朗活泼专业',
    cost: '100.00元/天'
  }
];

const swiperList = [willCardList, processingCardList, completedCardList];
</script>
