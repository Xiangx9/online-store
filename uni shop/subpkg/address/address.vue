<template>
	<view>
		<view class="item" v-for="(res, index) in siteList" :key="index">
			<view class="top">
				<view class="name">{{ res.name }}</view>
				<view class="phone">{{ res.phone }}</view>
				<view class="tag">
					<text v-if="res.isDefault" :class="{red:res.isDefault}">默认</text>
					<text>{{ res.tag }}</text>
				</view>
			</view>
			<view class="bottom" @click="toAddSite('edit',res)">
				{{res.address}}
				<u-icon name="edit-pen" :size="40" color="#999999"></u-icon>
			</view>
		</view>
		<view class="addSite" @click="toAddSite('add',{})">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteList: [],
				user: {}
			};
		},
		onLoad() {
		
		},
		onShow() {
			this.user = uni.getStorageSync('User').user
			this.getData();
		},
		methods: {
			async getData() {
				const {
					data: res
				} = await this.$u.get('/Address/userAddress')
				this.siteList = res
			},
			toAddSite(e,item) {
				uni.navigateTo({
					url: `/subpkg/address/addSite?show=${e}&row=${encodeURIComponent(JSON.stringify(item))}`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		padding: 40rpx 20rpx;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}

				.red {
					background-color: red
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}

	.addSite {
		display: flex;
		justify-content: space-around;
		width: 600rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
		background-color: #2979ff;
		border-radius: 60rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>