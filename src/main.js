import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Routes.js'
import VueApexCharts from "vue3-apexcharts";
import {createPinia} from 'pinia'

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.use(VueApexCharts)
.mount('#app')
