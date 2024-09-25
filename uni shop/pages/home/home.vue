<template>
	<view>
		<view style="height: 100rpx;"></view>
		<!-- 搜索组件 -->
		<view class="box">
			<my-search @myclick="gotoSerach"></my-search>
		</view>
		<weardfall :flowList='productList' />
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script>
	import weardfall from './weardfall.vue'
	export default {
		data() {
			return {
				productList: [],
				loadStatus: 'loadmore',
				// 查询关键词
				Name: '',
				// 页码值
				pagenum: 1,
				// 每页显示多少条数据
				pagesize: 5,
				total: 0,
			};
		},
		components: {
			weardfall
		},
		onLoad(e) {
			this.addRandomData();
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
			// 1. 重置关键数据
			this.pagenum = 1
			this.total = 0
			this.productList = []
			// 2. 重新发起请求
			this.addRandomData(() => uni.stopPullDownRefresh())
		},
		// 上拉触底
		onReachBottom() {
			this.loadStatus = 'loading';
			if (this.pagesize * this.pagenum > this.total) {
				this.loadStatus = 'nomore';
			} else {
				this.pagenum = ++this.pagenum;
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}
		},
		methods: {
			// 获取商品列表
			async addRandomData(cb) {
				let parm = {
					pageNumber: this.pagenum,
					pageSize: this.pagesize,
					Name: this.Name
				}
				const {
					data: res
				} = await this.$u.get('/products/authProduct', parm)
				// 只要数据请求完毕，就立即按需调用 cb 回调函数
				cb && cb()
				this.productList = [
					...this.productList,
					...res.products
				]
				this.total = res.totalCount
			},
			gotoSerach() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
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