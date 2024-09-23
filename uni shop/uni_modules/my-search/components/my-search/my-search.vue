<template>
  <view class="my-search-container" :style="{'background-color': bgc}" @click="$emit('myclick')">
    <!-- 使用 view 组件模拟 input 输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius': border + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>
<script>
	export default {
    props: {
      bgc: {
        type: String,
        default: '#8C7853',
      },
      border:{
        type:Number,
        default:18
      }
    },

}
</script>
<style lang="scss">

	.my-search-container {
	  // background-color: #c00000;
	  height: 50px;
	  padding: 0 10px;
	  display: flex;
	  align-items: center;
	}
	
	.my-search-box {
	  height: 36px;
	  background-color: #ffffff;
	  // border-radius: 15px;
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	
	  .placeholder {
	    font-size: 15px;
	    margin-left: 5px;
	  }
	}
</style>

