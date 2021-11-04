<script setup>
import { ref } from 'vue'
/* 样式使用变量 */
let color = ref('purple')
</script>

<template>
  <h1>hello vue3</h1>
</template>

<style scoped>
h1 {
  color: v-bind(color);
}
</style>
