<template>
  <ProPage
    show-navbar
    navbar-title="任务详情"
    class="page-pt-with-navbar hx-bg-white"
  >
    <view class="hx-p-[16px]">
      <TaskHeader :data="taskDetail" />

      <ProDivider />

      <BaseNeeds :data="taskDetail" />

      <TaskDescribe :data="taskDetail" />

      <TaskPlace :data="taskDetail" />

      <SecurityTip :data="taskDetail" />

      <ProButton type="primary" text="申请任务" />
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import TaskHeader from './components/TaskHeader.vue';
import BaseNeeds from './components/BaseNeeds.vue';
import TaskDescribe from './components/TaskDescribe.vue';
import TaskPlace from './components/TaskPlace.vue';
import SecurityTip from './components/SecurityTip.vue';

// const props = defineProps({
//   taskDetail:{
//     type: Object,
//     default: () => ({})
//   }
// })

const taskDetail = {
  title: '信息软件开发',
  tag: '待确认 ',
  tagStatus: 'unconfirmed',
  cost: '100元/天',

  address: '福州市 鼓楼区',
  experience: '0-3年',
  education: '本科',

  belong: '软件和信息技术',
  sector: '软件开发',

  personalRequirement: '性别不限、年龄不限、本科',
  taskTime: '2023/06/15-2023/08/15',
  taskRequirement: '专业技能go语言、相关经验0-3年、性格特点开朗活泼',

  describe: `1、对写一个网站，数据库用mysql，简答日志和故障日志查询，windows平台使用2个网站的对接，1 电联通信(有开发文档) 2vultr 有开发文档
      2、电联通信(有开发文档) 只需要以下功能 1 购买(支持月和天付款) 2 续费(支持月和大续费)3获取系统镜像 4管理页面跳转 5安全组默认全部开通
3、对写一个网站，数据库用mysql，简答日志和故障日志查询，windows平台使用2个网站的对接，1 电联通信(有开发文档) 2vultr 有开发文档
4、电联通信(有开发文档) 只需要以下功能 1 购买(支持月和天付款) 2 续费(支持月和大续费)3获取系统镜像 4管理页面跳转 5安全组默认全部开通
5、电联通信(有开发文档) 只需要以下功能 1 购买(支持月和天付款) 2 续费(支持月和大续费)3获取系统镜像 4管理页面跳转 5安全组默认全部开通
1、对写一个网站，数据库用mysql，简答日志和故障日志查询，windows平台使用2个网站的对接，1 电联通信(有开发文档) 2vultr 有开发文档
      2、电联通信(有开发文档) 只需要以下功能 1 购买(支持月和天付款) 2 续费(支持月和大续费)3获取系统镜像 4管理页面跳转 5安全组默认全部开通
3、对写一个网站，数据库用mysql，简答日志和故障日志查询，windows平台使用2个网站的对接，1 电联通信(有开发文档) 2vultr 有开发文档
4、电联通信(有开发文档) 只需要以下功能 1 购买(支持月和天付款) 2 续费(支持月和大续费)3获取系统镜像 4管理页面跳转 5安全组默认全部开通
5、电联通信(有开发文档) 只需要以下功能 1 购买(支持月和天付款) 2 续费(支持月和大续费)3获取系统镜像 4管理页面跳转 5安全组默认全部开通
`
};
</script>

<style scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
