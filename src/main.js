import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './css/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/tailwind.css'

createApp(App).use(store).use(router).mount('#app')

