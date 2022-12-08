import { createApp } from 'vue'
import App from './Apps.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as Vue from 'vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = Vue.createApp(App)

app.use(VueAxios, axios)
app.use(router)

app.mount('#app')
