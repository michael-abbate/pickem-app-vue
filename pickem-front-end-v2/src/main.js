import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from "./store";
// import { sync } from 'vuex-router-sync'
import store from '@/store/store'
// import 'font-awesome'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck, faCircleMinus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { faCircle} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCircleCheck, faCircleMinus, faCircle, faCircleXmark);

createApp(App).use(router)
            .use(store)
            .component("font-awesome-icon", FontAwesomeIcon)
            .mount('#app')
 