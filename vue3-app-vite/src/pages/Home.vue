
<template>
    <h1 @click="add">{{count}}</h1>
    <div>{{x}}-{{y}}</div>
    <StyleBind></StyleBind>
    <div>{{width}}-{{height}}</div>
    <button @click="loading">修改 icon</button>
    <button @click="toggle">全屏切换</button>
    <input v-model="text" @keydown.enter="addTodo"/>
    <ul>
        <li v-for="(item) in list">
            <input type="checkbox" v-model="item.done">
            <span>{{item.name}}</span>
        </li>
    </ul>
    <div>
        全选 <input type="checkbox" v-model="allDone">
        <span>{{active}} / {{all}}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useTodos from './../utils/useTodos'
import useMouse from './../utils/useMouse'
import useFavicon from './../utils/useFavicon'
import useWinSize from './../utils/useWinSize'
import StyleBind from './../components/style-bind.vue'
import { useFullscreen } from '@vueuse/core'

let count = ref(1)
function add() {
    count.value = count.value + 1
}
let {text, list, active, all, allDone, addTodo} = useTodos()
let {x,y}=useMouse()
let {favicon} = useFavicon()
let {width,height}= useWinSize()
function loading(){
  favicon.value = '/geek.png'
}
const { isFullscreen, enter, exit, toggle } = useFullscreen()

</script>
<style>
</style>