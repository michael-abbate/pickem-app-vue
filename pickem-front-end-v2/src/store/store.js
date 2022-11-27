import App from '../App.vue'
import { createApp } from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
// import Cookies from "js-cookie";

createApp(App).use(Vuex);

export default new Vuex.Store({
    strict: process.env.APP_ENV !== 'prod',
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        picks: ['test']
    },
    // getters,
    mutations: {
        setToken (state, token) {
            state.token = token
            // console.log("Store cookie:")
            // console.log(Cookies.get('token'));
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state, user) {
            state.user = user
        },
        SELECT_PICKS(state, picks){
            state.picks = picks;
            // state.picks.push(picks);
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token)
        },
        setUser ({commit}, user) {
            commit('setUser', user)
        }       
    }
    ,
    plugins: [
        createPersistedState()
      ]
});