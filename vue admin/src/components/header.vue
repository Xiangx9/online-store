<template>
  <div class="nav">
    <div style="margin-left: 20px;">
      <el-avatar @click="router.push('/My/')"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </div>
    <div style="display: flex;align-items: center;">
      <el-select style="width: 80px;" v-model="locale" @change="translate">
        <el-option label="zh-cn" value="zh-cn" />
        <el-option label="en-us" value="en-us" />
      </el-select>
      <el-select style="width: 80px;margin: 10px;" v-model="type" @change="onChange">
        <el-option label="light" value="light" />
        <el-option label="dark" value="dark" />
        <el-option label="red" value="red" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
const router = useRouter()
//i18n
const I18n = useI18n()
const { locale } = useI18n()
// 切换语言更改locale.value的值即可但要跟你index.js中message设置的值一致！
const translate = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}

const type = ref('light')
const onChange = (e) => {
  document.documentElement.setAttribute('theme-mode', type.value)
}
onChange()
</script>

<style scoped lang="scss">
.nav {
  width: 100%;
  height: 50px;
  background-color: var(--head-bgcolor);
  position: sticky;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>