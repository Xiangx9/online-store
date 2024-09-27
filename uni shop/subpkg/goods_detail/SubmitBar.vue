<template>
	<view class="navigation">
		<view class="left">
			<view class="item" @click="makePhoneCall()">
				<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">电话</view>
			</view>
			<!-- 	<view class="item">
				<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">店铺</view>
			</view> -->
			<view class="item car" @click="Cart()">
				<u-badge class="car-num" :count="counts" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">购物车</view>
			</view>
		</view>
		<view class="right">
			<view class="cart btn u-line-1" @click="AddCart()">加入购物车</view>
			<view class="buy btn u-line-1">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SubmitBar',
		data() {
			return {
				CartLists: [],
				counts:0
			}
		},
		props: {
			phone: String,
			products: Object,
			count: Number
		},
		watch: {
			count(newValue, oldValue) {
				this.counts =newValue
			}
		},
		onLoad() {},
		onShow() {},
		methods: {
			//添加购物车
			async AddCart() {
				try {
					let pram = {
						productId: this.products._id,
						quantity: 1
					}
					await this.$u.post('/cart/AddToCart', pram)
					this.counts++
					this.$u.toast(`添加成功`);
				} catch (e) {
					this.$u.toast(`添加失败`);
				}
			},
			Cart() {
				uni.switchTab({
					url: '/pages/cart/cart',
				})
			},
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: this.phone || '17343672511'
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.navigation {
		display: flex;
		width: 100vw;
		justify-content: space-between;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 20rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>