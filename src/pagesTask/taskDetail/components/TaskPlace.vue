<template>
  <view class="section-title hx-mb-[10px]"> 任务地点 </view>
  <map
    class="hx-h-[186px] hx-w-full hx-mb-[16px]"
    :latitude="latitude"
    :longitude="longitude"
    :markers="markers"
  />
</template>

<script setup lang="ts">
import { ITaskDetail } from '@/api/fe/wechat/task';
import { getGeo } from '@/api/amap';
import { PropType, shallowRef, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object as PropType<ITaskDetail>,
    default: () => ({})
  }
});

const markers = shallowRef<any>([]);
const longitude = shallowRef(0);
const latitude = shallowRef(0);

const getPositionByAddress = () => {
  const { province, city, area } = props.data;

  getGeo({ address: province + city + area }).then(res => {
    const { location } = res.data.geocodes[0];
    const [lng, lat] = location.split(',');
    longitude.value = lng;
    latitude.value = lat;
    markers.value = [
      {
        id: 0,
        latitude: lat,
        longitude: lng,
        // iconPath: './resources/placeholder.png', //图标路径
        width: 20,
        height: 20,
        callout: {
          //可根据需求是否展示经纬度
          content: city + area,
          color: '#000',
          display: 'ALWAYS'
        }
      }
    ];
  });
};

watch(props, getPositionByAddress);
</script>

<style scoped>
.section-content {
  background-color: rgb(61 134 242 / 6%);
}
</style>
