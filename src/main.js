import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Routes.js'
import VueApexCharts from "vue3-apexcharts";
import {createPinia} from 'pinia';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.use(VueSweetalert2)
.use(VueApexCharts)
.mount('#app')
