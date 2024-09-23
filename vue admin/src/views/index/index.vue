<template>
  <div class="right-content">
    <div style="display: flex; justify-content: space-between;  flex-wrap:wrap ;">
      <div style="flex: 1;">
        <bar />
      </div>
      <div style="flex: 1;">
        <pie />
      </div>
    </div>
    <div style="display: flex; justify-content: space-between;  flex-wrap:wrap ;">
      <div style="flex: 1;">
        <category />
      </div>
      <div style="flex: 1;">
        <barSort />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'
import { onMounted, ref } from 'vue'
import bar from './components/bar.vue'
import pie from './components/pie.vue'
import category from './components/category.vue'
import barSort from './components/barSort.vue'

onMounted(() => {

});

</script>

<style scope lang="scss"></style>