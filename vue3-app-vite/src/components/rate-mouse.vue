<template>
<div>
  <slot></slot>
  <div class="rate" :style="{color: color}" @mouseout="noMouseout" >
    <span @mousemove="onMove(num)"  v-for="num in 5" :key="num">☆</span>
    <div class="hollow" :style="{width: `${width}em`}">
      <span @mousedown="onRate(num)" @mousemove="onMove(num)" v-for="num in 5" :key="num">★</span>
    </div>
  </div>
</div>
</template>

<script setup>
/* defineProps 接收属性   defineEmits 更新到父组件 */
/* 
  v-model="xx" 子组件接受时只能是 modelValue
  需要自定义的话，只能是 v-model:ttt="xxx"
*/
import { ref, defineProps, defineEmits, computed } from 'vue';
const props = defineProps({
  value: Number,
  theme: {
    type: String,
    default: 'orange'
  }
})
const {value, theme} = props
const width = ref(value)
const onMove = (num) => {
  width.value = num
}

const noMouseout = () => {
  width.value = props.value
}

const emits = defineEmits(['update:value']) // 定义emits
const onRate = (num) => {
  emits('update:value', num)
}
const themeObj = { 'black': '#00', 'white': '#fff', 'red': '#f5222d', 'orange': '#fa541c', 'yellow': '#fadb14', 'green': '#73d13d', 'blue': '#40a9ff',}
let color = computed(() => themeObj[props.theme]) 

</script>

<style scoped>
.rate {
  position: relative;
  text-align: left;
}

.hollow {
  position: absolute;
  top: 0;
  overflow: hidden;
}
</style>