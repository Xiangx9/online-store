<template>
  <div class="right-content">
    <div ref="Chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, ref } from 'vue'

let internalInstance = getCurrentInstance(); //获取当前实例
let echarts = internalInstance.appContext.config.globalProperties.$echarts; //获取echarts实例

//通过ref获取html元素
const Chart = ref();

const init = () => {
  // 渲染echarts的父元素
  var infoEl = Chart.value;

  //  light dark
  var myChart = echarts.init(infoEl, "light"); //初始化echarts实例

  // 指定图表的配置项和数据 树图
  var option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.onresize = function () {
    myChart.resize()
  }
}

onMounted(() => {
  init()
});



</script>

<style scope lang="scss"></style>