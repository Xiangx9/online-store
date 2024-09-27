<template>
	<view class="">
		<view class="wrap">
			<u-swiper :list="products.Image" img-mode='aspectFit' height='500' mode='number' :autoplay="false"
				name='url' :effect3d="true"></u-swiper>
			<view class="text">
				{{products.Name}} {{products.Description}}
			</view>
			<view class="Price">
				￥ {{products.Price}}
			</view>
		</view>

		<view class="flex-bottom">
			<SubmitBar :phone='phone' :count='count' :products='products' />
		</view>
	</view>
</template>

<script>
	import SubmitBar from './SubmitBar.vue'
	export default {
		data() {
			return {
				products: {},
				phone: '',
				count:0
			};
		},
		components: {
			SubmitBar
		},
		onLoad(e) {
			this.phone = e.phone
			this.getproduct(e.id)
		},
		methods: {
			async getproduct(id) {
				const res = await this.$u.get('/cart/CartList')
				res.result[0].products.map(item=>{
					this.count=item.quantity+this.count
				})
				const {
					data: res1
				} = await this.$u.get(`/products/productsDetil/${id}`)
				this.products = res1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 20rpx;

		.text {
			margin: 20rpx 0;
			font-size: 35rpx;
			letter-spacing: 5rpx;
		}

		.Price {
			font-size: 30rpx;
			color: $u-type-error;
			margin-top: 5px;
		}
	}

	.flex-bottom {
		position: fixed;
		bottom: 0rpx;
	}
</style>