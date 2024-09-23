<template>
  <el-dialog :model-value="dialogVisible" :title="props.title" width="50%" :before-close="CancelVisible">
    <el-form label-width="auto" ref="FormRef" :model="form" :rules="rules">
      <el-form-item label="商品名称" prop="Name">
        <el-input v-model="form.Name" :prefix-icon="Calendar" />
      </el-form-item>
      <el-form-item label="商品价格" prop="Price">
        <el-input v-model.number="form.Price" :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" />
      </el-form-item>
      <el-form-item label="商品描述" prop="Description">
        <el-input v-model="form.Description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="Image">
        <Upload :Image="form.Image" @GetUrl="GetUrl" />
      </el-form-item>
      <el-form-item label="商品库存" prop="Stock">
        <el-input v-model.number="form.Stock" :suffix-icon="Calendar" />
      </el-form-item>
      <el-form-item label="商品状态">
        <label>
          <input type="radio" value="0" v-model="form.Status" />
          下架
        </label>
        &nbsp; &nbsp;
        <label>
          <input type="radio" value="1" v-model="form.Status" />
          上架
        </label>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="CancelVisible(FormRef)">{{ $t('Button.Cancel') }}</el-button>
        <el-button type="primary" @click="ConfirmVisible(FormRef)">{{ $t('Button.Confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits, defineProps } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Calendar, } from '@element-plus/icons-vue'
import Upload from './Upload/upload.vue'
const emit = defineEmits()
const props = defineProps({
  visible: Boolean, // 是否显示
  title: String,    // 标题
  From: {
    type: Object,
    default: () => ({})
  }, // 表单
})
let dialogVisible = toRef(props, 'visible') // 是否显示
// 表单
let form = toRef(props, 'From')

// 验证数字
const NumberValidator = (rule: any, value: any, callback: any) => {
  if (value <= 0) {
    callback(new Error('必须是大于0的数字'))
  } else {
    callback()
  }
}
// 表单验证
const FormRef = ref<FormInstance>()
const rules = reactive<FormRules<form>>({
  Name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
  ],
  Price: [
    { required: true, type: 'number', message: '请输入商品价格,必须是大于0的数字', trigger: 'blur' },
    { validator: NumberValidator, trigger: 'change' },
  ],
  Description: [
    { required: true, message: '请输入商品描述', trigger: 'blur' },
  ],
  // Image: [
  //   { required: true, message: '请上传商品图片', trigger: 'blur' },
  // ],
  Stock: [
    { required: true, type: 'number', message: '请输入商品库存,必须是大于0的数字', trigger: 'blur' },
    { validator: NumberValidator, trigger: 'change' },
  ],

})
//获取图片链接
const GetUrl = (e) => {
  form.value.Image.push(e)
}
// 确定
const ConfirmVisible = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleConfirmation('确定提交吗?', () => {
        if (form.value.Image.length == 0) {
          form.value.Image = [{
            name: '1',
            url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1qmiWw.img?w=768&h=1274&m=6&x=585&y=149&s=128&d=128'
          }, {
            name: '2',
            url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1qmbzU.img?w=768&h=1239&m=6&x=482&y=116&s=116&d=116'
          }, {
            name: '3',
            url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1qmbzY.img?w=768&h=1254&m=6&x=521&y=152&s=118&d=118'
          }, {
            name: '4',
            url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1qmguP.img?w=768&h=1198&m=6&x=512&y=150&s=123&d=123'
          }, {
            name: '5',
            url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1qmbA8.img?w=768&h=1249&m=6&x=325&y=80&s=73&d=73'
          }, {
            name: '6',
            url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1qme0I.img?w=768&h=1219&m=6'
          }]
        }
        emit('update:visible', true, form)
        FormRef.value.resetFields() // 重置表单
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 关闭弹窗
const CancelVisible = () => {
  handleConfirmation('确定取消吗?', () => {
    emit('update:visible', false, form)
    FormRef.value.resetFields() // 重置表单
  })
}

const handleConfirmation = (message: string, callback: void) => {
  ElMessageBox.confirm(message)
    .then(() => {
      callback()
    })
    .catch(() => {
      // catch error
    })

}


</script>
