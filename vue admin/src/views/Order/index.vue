<template>
  <div class="right-content">
    <header class="right-header">
      <h1>{{ $t('Orders.title') }}</h1>
      <el-button type="primary" @click="handleSizeChange(1)">{{ $t('Button.Query') }}</el-button>
    </header>

    <!-- 列表 -->
    <div class="right-table">
      <el-table :data="tableData" style="width: 100%;" height="800" align="center" border>
        <el-table-column type="index" width="50" />
        <el-table-column prop="OrderNumber" :label="$t('Orders.OrderNumber')" width="" />
        <el-table-column prop="ProductName" :label="$t('Orders.ProductName')" width="" />
        <el-table-column prop="Price" :label="$t('Orders.Price')" width="" />
        <el-table-column prop="Quantity" :label="$t('Orders.Quantity')" width="" />
        <el-table-column prop="Total" :label="$t('Orders.Total')" width="" />
        <el-table-column prop="Status" :label="$t('Orders.Status')" width="">
          <template #default="scope">
            <el-tag v-if="scope.row.Status" type="success">已支付</el-tag>
            <el-tag v-else type="danger">未支付</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" :label="$t('Orders.Action')" min-width="120">
          <template #default="scope">
            <el-button type="danger" size="small" plain @click="DeleteFrom">
              {{ $t('Button.Delete') }}
            </el-button>
            <el-button type="primary" size="small" plain @click="Edit(scope.row)">
              {{ $t('Button.Edit') }}
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <el-pagination :page-size="pageSize" :total="total" @current-change="handleSizeChange" />

  </div>
</template>

<script setup lang="ts">
import './index.scss'
import { onMounted, ref, } from 'vue'

// 获取列表
let pages = ref(1)
let pageSize = ref(20)
let total = ref(0)
const tableData = ref([{
  OrderNumber: '123456789',
  ProductName: '商品名称',
  Price: '100',
  Quantity: '1',
  Total: '100',
  Status: true
}])
const GetList = () => {
  let pram = {
    pages: pages.value,
    pageSize: pageSize.value,
    ...filters.value
  }
  console.log('获取列表', pram)
}

// 分页
const handleSizeChange = (val: number) => {
  pages.value = val
  GetList()
}

// 查询
let filters = ref<object>({})

onMounted(() => {
})

</script>

<style scope lang="scss"></style>