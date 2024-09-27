<template>
	<view class="wrap">
		<weardfall :flowList='productList' />
	</view>
</template>

<script>
	import weardfall from '../../pages/home/weardfall.vue'
	export default {
		props: {},
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
			}
		},
		components: {
			weardfall
		},
		onLoad(e) {
			e ? this.Name = e.Name : ''
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
				if (this.productList.length == 0) this.$u.toast('暂无商品');
			},

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 20rpx;

		.box {
			width: 49%;
			background-color: #fff;
			border-radius: 20rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
		}
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>