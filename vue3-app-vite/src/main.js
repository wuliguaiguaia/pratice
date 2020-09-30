import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import { store, storeSymbol } from "./store";


const app = createApp(App)

app.provide(storeSymbol, store); // 全局提供 store
app.mount('#app')

