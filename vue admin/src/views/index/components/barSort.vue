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
    dataset: [
      {
        dimensions: ['name', 'age', 'profession', 'score', 'date'],
        source: [
          ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
          ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
          ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
          ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
          ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
          ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
          ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
          ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
          ['Han Meimei', 67, 'Engineer', 366, '2011-03-12']
        ]
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
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