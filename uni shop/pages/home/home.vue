<template>
	<view>
		<view style="height: 100rpx;"></view>
		<!-- 搜索组件 -->
		<view class="box">
			<my-search @myclick="gotoSerach"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swpList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.good_id">
					<!-- 动态绑定图片的 src 属性 -->
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, i) in foorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->

				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2, i2) in item.product_list"
							:key="i2" v-if="i2 !== 0">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swpList: [], //轮播图数据
				navList: [], //导航栏数据
				foorList: [], //楼层数据
			};
		},
		onLoad() {
			//在小程序页面刚加载的时候，调用获取轮播图数据的方法
			this.getSwiperList()
			// 调用获取导航栏数据的方法
			this.getNavList()
			// 调用获取楼层数据的方法
			this.getFoorList()
		},
		methods: {
			//获取轮播图数据
			async getSwiperList() {
				// 3.1 发起请求
				const {
					data: res
				} = await uni.$http.get('/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg() // 3.2 如果请求失败返回请求失败提示信息
				// 3.3 请求成功，为 data 中的数据赋值
				this.swpList = res.message
			},
			//获取分类标签数据
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			// nav-item 项被点击时候的事件处理函数
			navClickHandler(item) {
				if (item.mame === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			//获取楼层数据
			async getFoorList() {
				const {
					data: res
				} = await uni.$http.get('/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 通过双层 forEach 循环，处理 URL 地址
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.foorList = res.message
			},
			gotoSerach() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;

		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			height: 128rpx;
			width: 140rpx;
		}
	}

	.floor-title {
		display: flex;
		height: 60rpx;
		width: 100%;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>