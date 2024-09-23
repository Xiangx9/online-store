<template>
  <div style="color: #fff;font-size: 30px;margin-top: -40px;">
    <el-icon @click="isCollapse = !isCollapse">
      <Fold />
    </el-icon>
  </div>
  <el-menu :background-color="background" class="el-menu-vertical-demo" :text-color="textColor" :collapse="isCollapse"
    @select="handleSelect" :default-active="activeMenu">
    <el-menu-item index="/">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>{{ $t('menu.Home') }}</span>
    </el-menu-item>
    <!-- 循环渲染菜单 -->
    <template v-for="menu in menuList" :key="menu.key">
      <el-sub-menu v-if="menu.children" :index="menu.key.toString()">
        <template #title>
          <el-icon>
            <component :is="menu.icon" />
          </el-icon>
          <span>{{ $t(menu.name) }}</span> <!-- 国际化支持 -->
        </template>
        <!-- 子菜单渲染 -->
        <el-menu-item v-for="subMenu in menu.children" :key="subMenu.path" :index="subMenu.path">
          {{ $t(subMenu.name) }} <!-- 国际化支持 -->
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {
  Avatar,
  GoodsFilled,
  List,
  HomeFilled,
  Fold
} from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
const background = ref('--head-bgcolor')
const textColor = ref('--text-color')


const menuList = [
  {
    key: 1,
    name: 'menu.Products',
    icon: GoodsFilled,
    children: [
      {
        name: 'menu.ProductList',
        path: '/Products',
      }
    ]
  },
  {
    key: 2,
    name: 'menu.Orders',
    icon: List,
    children: [
      {
        name: 'menu.OrderList',
        path: '/Order',
      }
    ]
  },
  {
    key: 3,
    name: 'menu.Users',
    icon: Avatar,
    children: [
      {
        name: 'menu.UserList',
        path: '/User',
      }
    ]
  },
]

const activeMenu = ref(route.path || '/')

// 处理菜单选择事件
const handleSelect = (key: string, keyPath: string[]) => {
  router.push(key)
  activeMenu.value = key;
}

// 判断是手机还是电脑
const handleResize = () => {
  if (window.innerWidth <= 768) {
    isCollapse.value = true
  } else {
    isCollapse.value = false
  }
}
handleResize()
window.addEventListener('resize', handleResize)

</script>

<style scope lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

//父级的类名
.el-sub-menu__title:hover {
  background-color: rgb(26, 131, 223) !important;
}

//子级的类名
.el-menu-item:hover {
  background-color: rgb(183, 190, 197) !important;
}
</style>