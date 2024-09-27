<template>
	<view class="wrap">
		<view class="box" v-for="(item,index) in list" :key="index" @click="goToDetail(item)">
			<u-lazy-load threshold="-450" border-radius="10" :image="item.Image[0].url" :index="index"></u-lazy-load>
			<view class="demo-title">
				{{item.Name}} {{item.Description}}
			</view>
			<view class="demo-price">
				{{item.Price}}元
			</view>
			<view class="demo-tag">
				<view class="demo-tag-owner">
					自营
				</view>
				<view class="demo-tag-text">
					放心购
				</view>
			</view>
			<view class="demo-shop">
				{{item.UserId.username}}的店铺
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'weardfall',
		props: {
			flowList: Array
		},
		data() {
			return {
				list: []
			}
		},
		watch: {
			flowList(newValue, oldValue) {
				this.list =newValue
			}
		},
		onLoad() {

		},
		methods: {
			goToDetail(e){
				console.log(e);
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?id=${e._id}&phone=${e.UserId.phone}`
				})
			}
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