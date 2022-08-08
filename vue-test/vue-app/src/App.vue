<template>
  <div id="app">
    {{a}}
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import mixin from './mixins'
let x = Vue.extend(HelloWorld)
console.log(new x());
console.log(HelloWorld);
export default {
  name: 'App',
  mixins: [ mixin ],
  extends: HelloWorld, // HelloWorld不能有prop 无法传递
  // components: {
  //   HelloWorld
  // }
  // 
  created() {
    console.log('app');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
