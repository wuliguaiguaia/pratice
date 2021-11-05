<script setup>
import { ref } from 'vue'
/* 样式还可以使用变量啊 */
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
