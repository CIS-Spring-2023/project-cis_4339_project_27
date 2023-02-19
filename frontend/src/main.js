import { createApp } from 'vue'
import router from './router'
import App from './App.vue'


import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'

const app = createApp(App)
app.use(router)
app.mount('#app')