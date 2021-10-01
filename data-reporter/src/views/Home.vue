<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
<script>
/* eslint-disable */
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted(){
    this.$addPerformanceTag('home', 'fetchStart');
    this.$performanceReporter()

    performance.mark('testMark')
    setTimeout(() => {
      performance.mark('testMark2')
    }, 2000);

    setTimeout(()=>{
      performance.measure('MMark', 'testMark', 'testMark2')
    },3000)

    this.$normalReporter({sss: 4444})



    performance.mark('ww1')
    setTimeout(() => {
      performance.mark('ww2')
    }, 2000);

    setTimeout(()=>{
      performance.measure('ww', 'ww1', 'ww2')
    },3000)

    performance.mark('ee11')
    setTimeout(() => {
      performance.mark('ee22')
    }, 2000);

    setTimeout(()=>{
      performance.measure('ee', 'ee11')
    },3000)

   setTimeout(() => {
      performance.clearMarks('hello-start')
   }, 1000);

  }
}
</script>
