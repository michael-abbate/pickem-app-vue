import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from "./store";
// import { sync } from 'vuex-router-sync'
import store from '@/store/store'

createApp(App).use(router).use(store).mount('#app')
 