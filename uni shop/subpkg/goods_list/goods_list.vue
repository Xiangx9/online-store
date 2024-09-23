<template>
  <view class="goods-list">
    <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
      <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
      <my-goods :goods="item"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 调用获取商品列表数据的方法
      this.getGoodsList()
    },
    data() {
      return {
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10,
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 是否正在请求数据
        isloading: false
      }
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
    
      // 2. 重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    // 触底的事件
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      // 判断是否正在请求其它数据，如果是，则不发起额外的请求
      if (this.isloading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
          // 只要数据请求完毕，就立即按需调用 cb 回调函数
          cb && cb()
        // 为数据赋值
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        // ** 关闭节流阀
        this.isloading = false
      },
      // 点击跳转到商品详情页面
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      }
    },
  }
</script>

<style lang="scss">

</style>
