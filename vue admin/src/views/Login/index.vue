<template>
  <div class="loginPage">
    <div class="login">
      <div class="logintext">{{ $t('login.Login') }}</div>
      <div class="field">
        <input type="text" placeholder="" v-model.trim="loginForm.username">
        <div class="placeholder"> {{ $t('login.Username') }}</div>
      </div>
      <div class="field">
        <input type="password" placeholder="" v-model.trim="loginForm.password">
        <div class="placeholder"> {{ $t('login.Password') }}</div>
      </div>
      <!-- <div class="loginbtn" @click="submitForm(loginForm, 'Register')">{{ $t('login.Register') }}</div> -->
      <div class="loginbtn" @click="submitForm(loginForm, 'login')">{{ $t('login.Login') }}</div>
    </div>
  </div>


</template>
<script setup>
import { login, register, updatePassword } from "./api.js"
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserStore from '@/store/user.js'
import { ElMessage } from "element-plus";
const route = useRoute()
const router = useRouter()


const loginForm = reactive({
  username: '',
  password: '',
})


// 提交表单
const submitForm = (formEl, Type) => {
  if (!formEl.username) {
    ElMessage.error('请输入用户名')
    return
  }
  if (!formEl.password) {
    ElMessage.error('请输入密码')
    return
  }
  Type == 'register' ? Register() : Login()
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

<style scope lang="scss">
@import './index.scss'
</style>