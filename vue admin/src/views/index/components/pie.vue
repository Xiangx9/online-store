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
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };

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