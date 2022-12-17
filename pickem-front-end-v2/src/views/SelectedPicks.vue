<template>
    <div class = "selected-picks-container">
        <h2>
            {{ nflweek }} Selections
        </h2>
        <table class="select-picks-table">
            <tr v-for="(type) in Object.keys(picks_form)" :key="type" :class="type+'-row'">
                <!-- <td>
                    {{ type }}
                </td> -->
                <td>
                    <select v-model="picks_form[type]" v-on:change = "updatePicksList(type)">
                        <option value="" selected disabled>Select {{ type }}</option>
                        <option  v-for="(pick,index) in getValidPicks(originalPicks, type)"
                            :key = "index"
                            :id="pick.gameID+'-'+type+'-submitted-picks'"
                            :value ="pick">
                            {{ pick.render_value }}
                        </option>
                    </select>
                    
                </td>
            </tr>
        </table>
        <div class = "message">{{ msg }}</div>
        <br>
        <button @click="submitPicks(nflweek)"></button>
    </div>
</template>

<script>
// import store from '../store';
import PicksService from '@/services/PicksService';
// import { ref } from 'vue'


// import axios from 'axios';
// import { defineComponent } from '@vue/composition-api'
// import router from '../router'

//TODO: IF SELEECTED FROM PICKS, REMOVE FROM THE LIST!
export default {
    name: 'SelectedPicks',
    data() {
       return {            
            msg: '',
            picks_form: {
                Favorite: '',
                Underdog: '',
                Over: '',
                Under: '',
                Lock: ''
            },
            originalPicks: []
       } 
    },
    methods: {        
        async submitPicks(nflweek) {
            console.log("submit button")
            console.log(this.picks_form)
            try {       
                console.log(`${nflweek} PICK FOR USER: ${this.$store.state.user.username}`)
                console.log(`Attempting to submit picks for user: ${this.$store.state.user.username}`)
                
                const response = await PicksService.submitPicks({
                    nflweek: nflweek,
                    username: this.$store.state.user.username,
                    favorite: JSON.stringify(this.picks_form.Favorite),
                    underdog: JSON.stringify(this.picks_form.Underdog),
                    over: JSON.stringify(this.picks_form.Over),
                    under: JSON.stringify(this.picks_form.Under),
                    lock: JSON.stringify(this.picks_form.Lock)                    
                });
 
                console.log(`Submitted picks for user: ${this.$store.state.user.username}`)
                this.msg = response.data.message
                // Wait 3 seconds then redirect to GroupPicks
                setTimeout(() => this.$router.push({ name:'GroupPicks' }), 3000);

            } catch(error) {
                console.log(`Failed to submit picks for user: ${this.$store.state.user.username}`)                
                this.msg = error.response.data.message
            }

        },
        getValidPicks(picks, pick_type) { 
            var filtered_picks;     
            if (pick_type === "Favorite") {
                filtered_picks = picks.filter(item => item.render_value.includes('-') || item.render_value === 'pk');
                return filtered_picks;
            }
            if (pick_type === "Underdog") {
                filtered_picks = picks.filter(item => item.render_value.includes('+') || item.render_value === 'pk');
                return filtered_picks;
            }
            else if (pick_type === "Over") {
                filtered_picks = picks.filter(item => /^(o\d{2}\.\d{1})|(o\d{2})|(o\d{1})/.test(item.render_value))
                return filtered_picks;
            }
            else if (pick_type === "Under") {
                filtered_picks = picks.filter(item => /^(u\d{2}\.\d{1})|(u\d{2})|(u\d{1})/.test(item.render_value))
                return filtered_picks;
            }
            else {
                return picks;
            }
        },
        updatePicksList(pick_type) {
            // if (selectField.target.value !== '') {
            //     console.log('picks updated')
            //     console.log('value',selectField.target.getAttribute('value'), 'index', this.originalPicks.indexOf(selectField.target.value))
            //     this.originalPicks.splice(this.originalPicks.indexOf(selectField.target.value),1)
            // }
            // console.log(JSON.stringify(selectField.target.value), 'index', this.originalPicks.indexOf(selectField.target.value))
            console.log(JSON.stringify(this.picks_form[pick_type]), 'index', this.originalPicks.indexOf(this.picks_form[pick_type]))
            // this.selectedPicks.push(selectField.target.value)
        }        

    }
    , computed: {
        // Passes values from showpicks to selectedpicks page
         picks() {
             return this.$store.state.picks.picks;
         },
         nflweek() {
            return this.$store.state.picks.nflweek;
         }
     }
     , created() {
        // Need to clone original array from Vuex store or else we will mutate original array which we do not want.
        this.originalPicks = [...this.picks]
        // this.originalPicks = ref(this.picks)
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

@media (pointer:fine) {
    .message {
        font-size:1vw;
        font-weight:bold;
    }

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

    button {
        background-color: dodgerblue;
        border-radius: 8px;
        font-size: 1.25vw;
        border:none;
        color:#fff;
        height:3vw;
        width:9vw;
    }

    button:hover {
        cursor: pointer;
        background-color: #fff;
        font-weight:bold;
        color:#1f1f1f;
    }
    button::after {
        content: "Submit";
    }
    button:hover::after {
    content: "LOCK 'EM IN!";
    }
}
@media (pointer:coarse) {
    .message {
        font-size:3vw;
        font-weight:bold;
    }
    td {
        font-size:5vw;
    }
    select {
        background-color: #fff;
        font-size: 4vw;
        border-radius: 8px;
        border-color:white;
        color:#1f1f1f;
        height:11vw;
        width:40vw;
    }

    select:hover {
        cursor: pointer;
        background-color: #1f1f1f;
        border-color:white;
        font-weight:bold;
        color:#fff;
    }

    button {
        background-color: dodgerblue;
        border-radius: 8px;
        font-size: 5vw;
        border:none;
        color:#fff;
        height:12vw;
        width:26vw;
    }

    button::after {
    content: "Submit";
    font-weight:bold;
    }


}

</style>