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
			<SubmitBar />
		</view>
	</view>
</template>

<script>
	import SubmitBar from './SubmitBar.vue'
	export default {
		data() {
			return {
				products: {}
			};
		},
		components: {
			SubmitBar
		},
		onLoad(e) {
			this.getproduct(e.id)
		},
		methods: {
			async getproduct(id = '66ee64db1a7b27d7eedcfc73') {
				const {
					data: res
				} = await this.$u.get(`/products/productsDetil/${id}`)
				this.products = res
				console.log(res);
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
	.flex-bottom{
		position: fixed;
		bottom: 0;
	}
</style>