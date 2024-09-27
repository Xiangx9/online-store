<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="loginForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-form-item :label="$t('login.Username')" prop="username">
        <el-input v-model.trim="loginForm.username" type="" autocomplete="off" clear />
      </el-form-item>
      <el-form-item :label="$t('login.Password')" prop="password">
        <el-input v-model.trim="loginForm.password" type="password" autocomplete="off" clear />
      </el-form-item>

      <el-form-item>
        <!-- <el-button @click="submitForm(ruleFormRef, 'register')">
          {{ $t('login.Register') }}
        </el-button> -->
        <el-button type="primary" @click="submitForm(ruleFormRef, 'login')">
          {{ $t('login.Login') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import './index.scss'
import { login, register, updatePassword } from "./api.js"
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserStore from '@/store/user.js'
const route = useRoute()
const router = useRouter()


const ruleFormRef = ref()

const loginForm = reactive({
  username: '',
  password: '',
})

// 表单验证
const rules = reactive({
  username: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
})

// 提交表单
const submitForm = (formEl, Type) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      Type == 'register' ? Register() : Login()
    } else {
      console.log('error submit!')
    }
  })
}

//注册
const Register = async () => {
  const { data: res } = await register(loginForm)
}

//登录
const Login = async () => {
  const { data: res } = await login(loginForm)
  UserStore().user = res.result

  router.replace({
    path: '/'
  })
}

</script>

<style scope lang="scss"></style>