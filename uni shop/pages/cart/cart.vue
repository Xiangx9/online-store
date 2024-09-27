<template>
	<view>
		<view style="height: 100rpx;"></view>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="index" @click="click"
			@open="open" :options="options" class="u-border-bottom">
			<view class="item ">
				<image mode="aspectFit" :src="item.productId.Image[0].url" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.productId.Name }}
						{{ item.productId.Description }}</text>
				</view>
			</view>
			<u-number-box class="number-box" :long-press='false' :min="1" :max="100" v-model="item.quantity"
				@minus='minusChang(item)' @plus='plusChang(item)'></u-number-box>
		</u-swipe-action>
		<u-divider bg-color='#0000000' color="#ccc" margin-top='20' margin-bottom='20'>商品推荐</u-divider>
		<weardfall :flowList='productList'></weardfall>
		<view class="bottom">
			<u-button ripple type="success" shape="circle">总金额
				￥{{total}} &nbsp;结算</u-button>
		</view>
	</view>
</template>

<script>
	import weardfall from '../home/weardfall.vue'
	export default {
		data() {
			return {
				list: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					},
					// {
					// 		text: '收藏',
					// 		style: {
					// 			backgroundColor: '#007aff'
					// 		}
					// 	},
				],
				cartId: '',
				total: 0,
				productList: []
			};
		},
		components: {
			weardfall
		},
		onLoad() {
			this.ProductList()
		},
		onShow() {
			this.CartList()
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
			this.ProductList()
			this.CartList()
		},
		methods: {
			// 删除购物车商品
			click(index, index1) {
				if (index1 == 0) {
					let productId = this.list[index].productId._id
					this.$u.delete(`/cart/DeleteCart?id=${this.cartId}&productId=${productId}`,).then(res => {
						this.list.splice(index, 1);
					})
					this.$u.toast(`删除成功`);
				} else {
					this.list[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			//获取购物车列表
			async CartList() {
				try {
					const res = await this.$u.get('/cart/CartList')
					this.list = res.result[0].products
					this.cartId = res.result[0]._id
					this.total = res.result[0].total
				} catch (e) {
					console.log(e);
				}
			},
			// 获取商品列表
			async ProductList() {
				let parm = {
					pageNumber: 1,
					pageSize: 100,
					Name: ''
				}
				const {
					data: res
				} = await this.$u.get('/products/authProduct', parm)
				this.productList = res.products
			},
			// 修改商品数量
			minusChang(e) {
				this.varChange(e)
			},
			plusChang(e) {
				this.varChange(e)
			},
			async varChange(e) {
				await this.Reduce()
				let pram = {
					'id': this.cartId,
					'productId': e.productId._id,
					'quantity': e.quantity,
				}
				const res = await this.$u.post('/cart/UpdateCart', pram)
			},
			// 计算总价
			Reduce() {
				this.total = this.list.reduce((acc, item) => {
					return acc + item.productId.Price * item.quantity;
				}, 0);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}

	.number-box {
		float: right;
		margin: 0 20rpx 20rpx 0rpx;
		z-index: 9999;
	}

	.bottom {
		position: fixed;
		bottom: 50rpx;
		right: 20rpx;
	}
</style>