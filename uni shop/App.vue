<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: async function() {
			// let user = uni.getStorageSync('User')
			// if (user) {
			// 	const res= await this.$u.post('/user/refreshToken', {
			// 		refreshToken: user.refreshToken
			// 	})
			// 	user.refreshToken=res.tokenInfo.refreshToken
			//  user.token=res.tokenInfo.token
			//  user.user.refreshToken=res.tokenInfo.refreshToken
			// }
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./uni_modules/vk-uview-ui/index.scss";
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>