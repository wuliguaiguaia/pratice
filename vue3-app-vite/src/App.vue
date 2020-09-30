<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <test></test>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import { provideState } from './store'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Test
  },
  setup(){
    provideState()
  }
}
</script>
