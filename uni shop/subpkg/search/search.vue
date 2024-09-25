<template>
	<view>
		<view class="serch-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
			</uni-search-bar>
		</view>
		<!-- //搜索结果 -->
		<view class="sugg-list" v-if="searchResults.length!==0">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item._id)">
				<view style="display: flex;">
					<view class="goods-name">{{item.Name}}</view>
					<u-image width="50rpx" height="50rpx" :src="item.Image[0].url" lazy-load></u-image>
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,
				// 搜索关键词
				value: '',
				// 搜索结果列表
				searchResults: [],
				historyList: []
			}
		},
		onload() {
			// 加载本地存储的搜索历史记录
			this.historyList = uni.getStorageSync('value') || []
		},
		methods: {
			input(res) {
				// console.log(res);
				//防抖
				if (this.timer !== null) clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					this.value = res
					// 根据关键词，查询搜索建议列表
					this.getSearchList()
				}, 500)
			},
			// 根据搜索关键词，搜索商品建议列表
			async getSearchList() {
				// 判断关键词是否为空
				if (this.value === '') {
					this.searchResults = []
					return
				}
				// 发起请求，获取搜索建议列表
				const {
					data: res
				} = await this.$u.get('/products/authProduct', {
					Name: this.value
				})
				this.searchResults = res.products
				// 1. 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
				this.saveSearchHistory()
				if(this.searchResults.length==0) this.$u.toast('暂无商品');
			},
			gotoDetail(goods_id) {
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?id=" + goods_id
				})
			},
			// 2. 保存搜索关键词的方法
			saveSearchHistory() {
				// 2.1 直接把搜索关键词 push 到 historyList 数组中
				// this.historyList.push(this.value)
				// 1. 将 Array 数组转化为 Set 对象
				const set = new Set(this.historyList)
				// 2. 调用 Set 对象的 delete 方法，移除对应的元素
				set.delete(this.value)
				// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				set.add(this.value)
				// 4. 将 Set 对象转化为 Array 数组
				this.historyList = Array.from(set)
				// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('value', this.historyList)
			},
			// 清空搜索历史记录
			cleanHistory() {
				// 清空 data 中保存的搜索历史
				this.historyList = []
				// 清空本地存储中记录的搜索历史
				uni.setStorageSync('value', '[]')
			},
			// 点击跳转到商品列表页面
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?Name=' + item
				})
			}
		},
		computed: {
			historys() {
				// 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
				// 而是应该新建一个内存无关的数组，再进行 reverse 反转
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.serch-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>