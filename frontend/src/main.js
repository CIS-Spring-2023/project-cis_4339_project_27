import { createApp, markRaw } from 'vue'
import router from './router'
import App from './App.vue'


import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from "axios"

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

pinia.use(({ store }) => {
    store.$router= markRaw(router)
})

const app = createApp(App)
const pinia = createPinia();
pinia.use(({ store }) => {
    store.$router = markRaw(router)
  });
pinia.use(piniaPluginPersistedstate)


app.use(pinia)
app.use(router)
app.use(pinia)
app.mount('#app')