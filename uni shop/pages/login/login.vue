<!-- 顶部蓝色 -->
<template>
	<view class="contaier">
		<view class="top-bg">
			<view class="text-white text-bold text-xxxl">前端铺子</view>
			<view class="margin-top-xs text-white">欢迎使用，请先登录</view>
		</view>

		<view class="input-box padding-lr">
			<u-form :model="form">
				<u-form-item label="账号" prop="username">
					<u-input v-model="form.username" />
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input v-model="form.password" />
				</u-form-item>
			</u-form>
		</view>

		<view class="bttom">
			<u-button plain type="primary" shape='circle' @click="login">登录</u-button>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
			};
		},
		onLoad() {

		},
		methods: {
			login() {
				if (this.form.username == '' || this.form.password == '') {
					return this.$u.toast('请输入账号或密码');
				}
				this.$u.post('/user/login', {
					username: this.form.username,
					password: this.form.password
				}).then(res => {
					uni.setStorageSync('User', res)
					uni.navigateBack()
				}).catch(res => {
					this.$u.toast(res.data.message);
				})
			}
		},
	};
</script>
<style lang="scss" scoped>
	.top-bg {
		width: 750rpx;
		background-image: url(https://cdn.zhoukaiwen.com/head-bg.png);
		height: 480rpx;
		background-size: 100%;
		background-repeat: no-repeat;
		text-align: center;
		padding-top: 170rpx;
	}

	.bg-login-zl {
		background-image: linear-gradient(45deg, #727CFB, #46D0ED);
		color: #ffffff;
	}

	.input-box {
		margin: 30rpx;
		padding: 30rpx;
		background: linear-gradient(45deg, #e8e8e8, #f0f0f0);
		border: 20rpx;
	}

	.bttom {
		margin: 60rpx 30rpx;
	}
</style>