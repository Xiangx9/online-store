<script setup>
import './index.scss'
import Header from '../components/Header.vue'
import Menu from '../components/Menu.vue'

import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
const { locale } = useI18n()
const language = ref(locale)
const locales = computed(() => (language.value === 'zh-cn' ? zhCn : en))

</script>

<template>
  <div style="height: 100vh;">
    <Header></Header>
    <div class="home">
      <div class="left">
        <Menu></Menu>
      </div>
      <div class="right">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <el-config-provider :locale="locales">
              <component :is="Component" />
            </el-config-provider>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 95vh;
  margin-top: -20px;
  background-color: var(--bg-color);
  display: flex;

  .left {
    background-color: var(--head-bgcolor);
  }

  .right {
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
  }
}
</style>
