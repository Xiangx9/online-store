<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input v-model.trim="address.name" type="text" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input v-model.trim="address.phone" type="text" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="show=true">
				<view class="left">所在地区</view>
				<input v-model.trim="address.region" disabled type="text" placeholder-class="line"
					placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea v-model.trim="address.address" type="text" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<view class="tag">
				<view class="left">标签</view>
				<view class="right" v-for="(item,index) in tags" :key='index' @click="changTag(item,index)">
					<text class="tags" :style="index== i ? 'border-color: red;color:red' : ''">{{item}}</text>
				</view>
			</view>
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right">
					<u-switch v-model="address.isDefault"></u-switch>
					<!-- <switch v-model="address.isDefault"  color="red" @change="setDefault" /> -->
				</view>
			</view>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" @confirm='confirmPicker' />

		<view class="addSite" @click="toAddSite" v-if="!edit">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>添加
			</view>
		</view>
		<view class="eidtSite" v-else>
			<u-button type="primary" @click="editSite">
				<u-icon name="edit-pen" color="#ffffff" class="icon" :size="30"></u-icon>修改
			</u-button>
			<view style="height: 20rpx;"></view>
			<u-button type="error" @click="delSite">
				<u-icon name="close" color="#ffffff" class="icon" :size="30"></u-icon>删除
			</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				i: 0,
				tags: ['家', '公司', '学校'],
				show: false,
				address: {
					name: '',
					phone: '',
					region: '',
					userId: '',
					tag: '家',
					isDefault: false,
				},
				edit: false
			};
		},
		onLoad(e) {
			let user = uni.getStorageSync('User').user
			this.address.userId = user._id
			if (e.show == 'edit') {
				this.edit = true
				const row = JSON.parse(decodeURIComponent(e.row));
				this.address = row
				console.log(row);
			}

		},
		methods: {
			setDefault() {
				this.address.isDefault = !this.address.isDefault;
			},

			changTag(item, index) {
				this.i = index
				this.address.tag = item
			},
			// 地区选择
			confirmPicker(e) {
				console.log(e);
				this.address.region = `${e.area.name}-${e.city.name}-${e.province.name}`
			},
			// 添加
			async toAddSite() {
				if (this.address.name == '' || this.address.phone == '') {
					this.$u.toast(`请填写姓名和电话`);
					return false
				}
				await this.$u.post('/Address/addAddress', this.address).then(res => {
					this.$u.toast('添加成功')
					uni.navigateBack()
				})
				console.log(this.address);
			},
			// 编辑 
			async editSite() {
				await this.$u.post('/Address/updateAddress',this.address).then(res => {
					this.$u.toast('删除成功')
					uni.navigateBack()
				})
			},
			//删除
			async delSite(id) {
				await this.$u.post('/Address/delAddress',{id:this.address._id}).then(res => {
					this.$u.toast('删除成功')
					uni.navigateBack()
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	/deep/ .line {
		color: $u-light-color;
		font-size: 28rpx;
	}

	.wrap {
		background-color: #f2f2f2;

		.top {
			background-color: #ffffff;
			border-top: solid 2rpx $u-border-color;
			padding: 22rpx;

			.item {
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}

			.site-clipboard {
				padding-right: 40rpx;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;

					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.bottom {
			margin-top: 20rpx;
			padding: 40rpx;
			padding-right: 0;
			background-color: #ffffff;
			font-size: 28rpx;

			.tag {
				display: flex;

				.left {
					width: 160rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;

					.tags {
						width: 140rpx;
						padding: 16rpx 8rpx;
						border: solid 2rpx $u-border-color;
						text-align: center;
						border-radius: 50rpx;
						margin: 0 10rpx 20rpx;
						display: flex;
						font-size: 28rpx;
						align-items: center;
						justify-content: center;
						color: $u-content-color;
						line-height: 1;
					}

					.plus {
						//padding: 10rpx 0;
					}
				}
			}

			.default {
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: solid 2rpx $u-border-color;
				line-height: 64rpx;

				.tips {
					font-size: 24rpx;
				}

				.right {}
			}
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

	.eidtSite {
		width: 600rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
	}
</style>