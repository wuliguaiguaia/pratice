<template>
  <h1>{{ msg }}</h1>
  <button @click="store.increment()">number is: {{ store.state.number }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import {useState, useStore} from './../store'
import { inject } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    // 这里的this 为 undefined
    let store = useStore(); // 插入到某个组件
    console.log(store)
    return {
      state: useState(),
      store: store() // 返回
    }
  }
}
</script>
