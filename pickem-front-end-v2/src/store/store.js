import App from '../App.vue'
import { createApp } from 'vue'
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate'
// import Cookies from "js-cookie";

createApp(App).use(Vuex);

export default new Vuex.Store({
    // strict: true,
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
    // ,
    // plugins: [
    //     createPersistedState({
    //       getState: (key) => Cookies.getJSON(key),
    //       setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    //     })
    //   ]
});