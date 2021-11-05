<template>
  <div :style="{color: color}">
    {{rate}}
  </div>
</template>

<script setup>
/* "★★★★★☆☆☆☆☆".slice(5 - value, 10 - value) 的写法惊艳了。。。 */

import { defineProps, computed } from 'vue';
let {value, theme} = props
let rate = computed(() =>  "★★★★★☆☆☆☆☆".slice(5 - value, 10 - value))

const themeObj = { 'black': '#00', 'white': '#fff', 'red': '#f5222d', 'orange': '#fa541c', 'yellow': '#fadb14', 'green': '#73d13d', 'blue': '#40a9ff',}

let color = computed(() => themeObj[theme]) 

</script>

