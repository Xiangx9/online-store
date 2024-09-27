<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="top">
			<u-avatar :src="user.avatar" size='large'></u-avatar>
			<view style="text-align: center; width: 350rpx;">
				<view style="color: #000;font-weight: 800;font-size: 35rpx;margin: 20rpx 0;">
					<span v-if="user.username">{{ user.username }}</span>
					<span v-else @click="Login()">登录</span>
				</view>
				<view class="usertype" v-if="user.username">
					<text>Lv.1会员</text>
				</view>
			</view>
		</view>

		<view class="nav">
			<view class="account" v-for="item in list">
				<view class="flex" @click="goToPages(item.address)">
					<i class="iconfont" :class='item.icon'></i>
					<view class="btnav">{{item.name}}</view>
				</view>
				<view style="color: #BBBBBB;"> → </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						icon: 'icon-duizhang-39',
						name: '消费记录',
						address:''
					}, {
						icon: 'icon-dianpu',
						name: '地址管理',
						address:'/subpkg/address/address'
					},
					{
						icon: 'icon-shezhi1',
						name: '个人资料',
						address:''
					}
				],
				user: {},
				src: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1oGYlS.img?w=768&h=783&m=6'
			};
		},
		onLoad() {
	
		},
		onShow() {
			this.user = uni.getStorageSync('User').user
			console.log(this.user);
		},
		methods: {
			Login() {
				uni.navigateTo({
					url: '/pages/login/login',
				})
			},
			goToPages(address){
				uni.navigateTo({
					url:address
				})
			}
		}
	}
</script>

<style scoped>
	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 20rpx 30rpx 0 30rpx;
		padding: 80rpx 0 50rpx 0;
		border-radius: 20rpx;
		background: linear-gradient(45deg, rgb(0, 223, 223), rgb(141, 198, 63));
		;
	}

	.usertype {
		width: 130rpx;
		height: 50rpx;
		border-radius: 30rpx;
		line-height: 50rpx;
		background-color: #FECE00;
		color: #000;
		font-size: 20rpx;
		margin: 0 auto;
		/* margin-left: 100rpx; */
		/* 		display: flex;
		justify-content: center; */

	}

	.nav {
		margin: 20rpx 30rpx 0 30rpx;
		font-size: 30rpx;
		border-radius: 20rpx;
		background-color: #000;
		background: rgba(255, 255, 255, 0.5);
	}

	.account {
		height: 120rpx;
		overflow: hidden;
		font-weight: 400;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
	}

	.iconfont {
		font-size: 55rpx;
		font-weight: 400;
		fill: currentColor;
		overflow: hidden;
	}

	.btnav {
		margin: 0 30rpx;
		font-size: 33rpx;
		font-weight: 500;
		color: #000;
	}

	.flex {
		display: flex;
	}
</style>