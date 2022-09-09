import App from '../App.vue'
import { createApp } from 'vue'

import Vuex from 'vuex';

createApp(App).use(Vuex);

export default new Vuex.Store({
    state: {
        picks: ['test']
    },
    // getters,
    mutations: {
        SELECT_PICKS(state, picks){
            state.picks = picks;
            // state.picks.push(picks);
        }
    }
    // actions
});