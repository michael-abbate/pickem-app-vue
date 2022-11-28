<template>
    <div class = "selected-picks-container">
        <table class="select-picks-table">
            <tr v-for="(type) in Object.keys(picks_form)" :key="type" :class="type+'-row'">
                <td>
                    {{ type }}
                </td>
                <td>
                    <select v-model="picks_form[type]">
                        <option value="" disabled selected>Select {{ type }}</option>
                        <option v-for="(pick,index) in picks"
                            :key = "index"
                            :id="pick+'submitted-picks'"
                            :value ="pick">
                            {{ pick.render_value }}
                        </option>
                    </select>
                    
                </td>
            </tr>
        </table>
        <button @click="submitPicks">Submit</button>
    </div>
</template>

<script>
// import store from '../store';
import PicksService from '@/services/PicksService';

// import axios from 'axios';
// import { defineComponent } from '@vue/composition-api'
// import router from '../router'

//TODO: IF SELEECTED FROM PICKS, REMOVE FROM THE LIST!
export default {
    name: 'SelectedPicks',
    data() {
       return {
           submitpicks: [],
           picks_form: {
            Favorite: '',
            Underdog: '',
            Over: '',
            Under: '',
            Lock: ''
           }
       } 
    },
    methods: {        
        async submitPicks() {
            console.log("submit button")
            try {       
                console.log(`Attempting to submit picks for user: ${this.$store.state.user.username}`)
                // Update: no longer log in user after registering them      
                await PicksService.submitPicks({
                    nfl_week: "nfl week testing",
                    username: this.$store.state.user.username,
                    favorite: this.picks_form.Favorite.render_value,
                    underdog: this.picks_form.Underdog.render_value,
                    over: this.picks_form.Over.render_value,
                    under: this.picks_form.Under.render_value,
                    lock: this.picks_form.Lock.render_value,
                    pick_json: JSON.stringify(this.picks_form)
                });
                // this.$router.push({
                //     name: 'GroupPicks'
                // })
                console.log(`Submitted picks for user: ${this.$store.state.user.username}`)
                

            } catch(error) {
                console.log(`Failed to submit picks for user: ${this.$store.state.user.username}`)
                console.log("error:");
                console.error(error);
                this.error = error.response.data.error

            }

        }
    }
     , computed: {
         picks() {
             return this.$store.state.picks.picks;
         }
     }
};
</script>

<style scoped>
table {
    margin: 0 auto;
    font-size: 2vw;
    border-collapse:separate; 
    border-spacing:1em!important;
    color:#fff;
    text-align: left;
}
/* 
select {
    height:1.75em;
    width:10em;
    font-size: 1.5vw;
    border-radius:15px;
    /* padding: 5px; */
/* }
*/

select {
    background-color: #fff;
    font-size: 1vw;
    border-radius: 8px;
    border-color:white;
    color:#1f1f1f;
    height:3vw;
    width:10vw;
}

select:hover {
    cursor: pointer;
    background-color: #1f1f1f;
    border-color:white;
    font-weight:bold;
    color:#fff;
}
</style>