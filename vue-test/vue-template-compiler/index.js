const compiler = require('vue-template-compiler');
const template = `<template>
    <h1 class="title">{{msg}}</h1>
    <input type="text" v-model.lazy="count">
    <button @click="changeCount">click me!</button>
  </template>
  <script></script>
  <style></style>
  `;
const data = compiler.compile(template);
console.log(data);