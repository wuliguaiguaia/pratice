<template>
    <h1>这是关于</h1>
    <h2></h2>
    您的评分是{{score}}
    <Rate v-model:value="score" theme="red"></Rate>
    <Rate v-model:value="score">课程评分</Rate>
    <Rate v-model:value="score">
        <img width="14" src="/favicon.ico">
    </Rate>
</template>

<script setup>
import { ref } from 'vue';
import Rate from '../components/rate-mouse.vue';
const score = ref(2)


</script>