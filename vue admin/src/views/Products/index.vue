<template>
  <div class="right-content">
    <header class="right-header">
      <h1>{{ $t('Products.title') }}</h1>
      <el-button type="primary" @click="AddVisible = true">{{ $t('Button.Add') }}</el-button>
      <el-select v-model="filters.Status" placeholder="请选择商品状态" clearable style="margin: 0 20px"
        @change="handleSizeChange(1);">
        <el-option label="已上架" :value="'1'" />
        <el-option label="已下架" :value="'0'" />
      </el-select>
      <el-button type="primary" @click="handleSizeChange(1)">{{ $t('Button.Query') }}</el-button>
    </header>

    <!-- 列表 -->
    <div class="right-table">
      <el-table :data="tableData" style="width: 100%;" height="800" align="center" border>
        <el-table-column type="index" width="50" />
        <el-table-column prop="Name" :label="$t('Products.Name')" width="" />
        <el-table-column prop="Price" :label="$t('Products.Price')" width="" />
        <el-table-column prop="Description" :label="$t('Products.Description')" width="" />
        <el-table-column prop="Image" :label="$t('Products.Image')" width="">
          <template #default="scope">
            <el-image :src="scope.row.Image[0].url" loading="lazy" style="" :fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="Stock" :label="$t('Products.Stock')" width="" />
        <el-table-column prop="Status" :label="$t('Products.Status')" width="">
          <template #default="scope">
            <el-tag v-if="scope.row.Status == '1'" type="success">已上架</el-tag>
            <el-tag v-else type="danger">已下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('Products.Action')" min-width="120">
          <template #default="scope">
            <el-popconfirm :title="`${$t('Button.Confirm')}${$t('Button.Delete')}?`" @confirm="DeleteFrom(scope.row)">
              <template #reference>
                <el-button type="danger" size="" plain>
                  {{ $t('Button.Delete') }}
                </el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" size="" plain @click="Edit(scope.row)">
              {{ $t('Button.Edit') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination :page-size="pageSize" :total="total" @current-change="handleSizeChange" />

    <!-- 添加 -->
    <div class="right-form">
      <Form :visible="AddVisible" :title="$t('Button.Add')" :From="From" @update:visible="AddForm" />
    </div>

    <!-- 编辑 -->
    <Form :visible="EditVisible" :title="$t('Button.Edit')" :From="From" @update:visible="EditFrom" />
  </div>
</template>

<script setup lang="ts">
import './index.scss'
import { onMounted, ref, } from 'vue'
import Form from './components/Form.vue'
import { getProductList, addProduct, EditProduct, DelProduct, } from './api'

// 获取列表
let pages = ref(1)
let pageSize = ref(20)
let total = ref(0)
const tableData = ref([{
  Name: '商品1',
  Price: '100',
  Description: '商品1',
  Image: '商品1',
  Stock: '商品1',
  Status: '0'
}])
const GetList = async () => {
  try {
    let pram = {
      pages: pages.value,
      pageSize: pageSize.value,
      ...filters.value
    }
    const { data: res } = await getProductList(pram)
    total.value = res.data.totalCount
    tableData.value = res.data.products
  } catch (error) {
    console.log('获取商品列表失败', error)
  }
}

// 分页
const handleSizeChange = (val: number) => {
  pages.value = val
  GetList()
}

// 查询
let filters = ref<object>({})

// 表单数据
let From = ref<object>({
  Status: '0',
  Image: []
})
// 添加和编辑的可见状态
let AddVisible = ref<boolean>(false);
let EditVisible = ref<boolean>(false);
// 添加表单处理
const AddForm = async (e: boolean, form: object) => {
  if (e) {
    await addProduct(form.value)
    await GetList()
    AddVisible.value = false
  } else {
    AddVisible.value = false
  }
};

// 编辑表单处理
const EditFrom = async (e: boolean, form: object) => {
  if (e) {
    await EditProduct(form.value)
    await GetList()
    EditVisible.value = false
  } else {
    EditVisible.value = false
  }
  From.value = {
    Status: '0',
    Image: []
  }
};

// 编辑时初始化表单数据并显示表单
const Edit = (row: object) => {
  console.log(row);

  From.value = Object.assign({}, row); // 初始化编辑表单的内容
  EditVisible.value = true; // 打开编辑表单
};

// 删除
const DeleteFrom = async (row: Object) => {
  try {
    await DelProduct(row)
    await GetList()
  } catch (error) {
    console.log('删除商品', error);
  }
  console.log('删除')
}

onMounted(() => {
  GetList()
})

</script>

<style scope lang="scss"></style>