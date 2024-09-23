<template>
  <div class="right-content">
    <header class="right-header">
      <h1>{{ $t('Users.title') }}</h1>
      <el-button type="primary" @click="handleSizeChange(1)">{{ $t('Button.Query') }}</el-button>
    </header>

    <!-- 列表 -->
    <div class="right-table">
      <el-table :data="tableData" style="width: 100%;" height="800" align="center" border>
        <el-table-column type="index" width="50" />
        <el-table-column prop="Username" :label="$t('Users.Username')" width="" />
        <el-table-column prop="Avatar" :label="$t('Users.Avatar')" width="">
          <template #default="scope">
            <el-avatar :src="scope.row.Avatar" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="Email" :label="$t('Users.Email')" width="" />
        <el-table-column prop="Phone" :label="$t('Users.Phone')" width="" />
        <el-table-column prop="Address" :label="$t('Users.Address')" width="" />
        <el-table-column prop="Role" :label="$t('Users.Role')" width="" />
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
  Username: '张三',
  Avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  Email: '123456@qq.com',
  Phone: '123456789',
  Address: '北京市',
  Role: '管理员'
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