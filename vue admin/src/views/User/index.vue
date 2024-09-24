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
        <el-table-column prop="" :label="$t('Users.Avatar')" width="">
          <template #default="scope">
            <el-avatar :src="scope.row.avatar" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="username" :label="$t('Users.Username')" width="" />
        <el-table-column prop="phone" :label="$t('Users.Phone')" width="" />
        <el-table-column prop="address" :label="$t('Users.Address')" width="" />
        <el-table-column prop="createdAt" :label="$t('Users.CreatedAt')" width="">
          <template #default="scope">
            {{ new Date(scope.row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('Users.Action')" min-width="120">
          <template #default="scope">
            <el-button type="" size="" plain @click="Detail(scope.row)">
              {{ $t('Button.Details') }}
            </el-button>
            <el-button v-if="role == 'admin'" type="primary" size="" plain @click="Edit(scope.row)">
              {{ $t('Button.Edit') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination :page-size="pageSize" :total="total" @current-change="handleSizeChange" />

    <!-- 编辑 -->
    <el-dialog v-model="EditdialogVisible" width="30%" center>
      <el-select v-model="roleValue.role" placeholder="Select" size="large" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <template #footer>
        <el-button type="primary" size="" plain @click="changRole()">
          {{ $t('Button.Confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import './index.scss'
import { onMounted, ref, } from 'vue'
import { getUserList, updateRole } from './api'
import UserStore from "@/store/user"; // 引入用户信息
const role = UserStore().user.user.role || 'admin'

// 获取列表
let pages = ref(1)
let pageSize = ref(20)
let total = ref(0)
const tableData = ref([])
const GetList = async () => {
  let pram = {
    pages: pages.value,
    pageSize: pageSize.value,
    ...filters.value
  }
  const { data: res } = await getUserList()
  total.value = res.result.totalCount
  tableData.value = res.result.userListWithOrders
}

// 分页
const handleSizeChange = (val: number) => {
  pages.value = val
  GetList()
}

// 查询
let filters = ref<object>({})

// 修改角色
let EditdialogVisible = ref(false)
const options = [{
  value: 'user',
  label: '商家用户'
}, {
  value: 'guest',
  label: '普通用户'
}]
const roleValue = ref({})
const Edit = async (row: any) => {
  roleValue.value = row
  EditdialogVisible.value = true
}
const changRole = async () => {
  let pram = {
    id: roleValue.value._id,
    role: roleValue.value.role
  }
  const { data: res } = await updateRole(pram)
  if (res.code === 200) {
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    EditdialogVisible.value = false
    GetList()
  } else {
    ElMessage({
      message: '修改失败',
      type: 'error'
    })
  }
}

onMounted(() => {
  GetList()
})

</script>

<style scope lang="scss"></style>