<template>
	<view style="padding: 20rpx;">
		<u-form :model="form" ref="form1">
			<u-form-item label="姓名" prop="username"><u-input v-model="form.username" /></u-form-item>
			<u-form-item label="手机" prop="phone"><u-input v-model="form.phone" /></u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">提交</u-button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					phone: "",
				},
				rules: {
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur']
					}],
				}
			};
		},
		onReady() {
			this.$refs.form1.setRules(this.rules);
		},
		onLoad() {
			let userInfo = Object.assign({}, uni.getStorageSync('User').user)
			this.form = userInfo
			this.form.id = this.form._id
		},
		methods: {
			submit() {
				this.$refs.form1.validate((valid) => {
					console.log(valid);
					if (valid) {
						this.$u.post('/user/uodataUser', this.form).then(res => {
							console.log(1, res.UserInfo);
							let storedData = uni.getStorageSync('User')
							if (!storedData.user) {
							    storedData.user = {}; 
							}
							storedData.user= res.UserInfo
							uni.setStorageSync('User',storedData)
							this.$u.toast('修改成功');
							uni.navigateBack()
						})
					}
				})
			},
		}
	};
</script>