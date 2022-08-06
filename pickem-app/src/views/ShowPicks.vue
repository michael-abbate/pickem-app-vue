<template>
    <!-- <router-link :to="{ name: 'SelectedPicks', params: { selectedpicks: picks } }">Go to Select</router-link> -->
    <div id="show-picks">
        <button @click = "selectpicks()">Select</button>
        <div>
            selected picks: <strong>{{ picks }}</strong>
        </div>
        <table v-cloak v-for="(game,index) in games" :key = "game.gameID" :class="game.gameID+'game-table'">
            <tr :class="'away-row-'+index+'-'+game.gameID">
                <td class = "matchup-cell">
                    {{ game.team1Name }}                    
                </td>
                <!-- need to do a check for fav/dog and o/u -->
                <!-- hit the api to get the data then run the check mentioned above -->
                <td class="pickem-cell">          
                    <label :for="game.gameID+'-fav'"></label>
                    <input v-model="picks" type="checkbox" :id="game.gameID+'-fav'" :value="game.team1Name + sample_spread">
                    -{{ sample_spread }}
                </td>
                <td class="pickem-cell">
                    o{{ sample_ou }}
                </td>     
            </tr>        
            <tr :class="'home-row-'+index+'-'+game.gameID">
                <td v-text = "game.team2Name" class = "matchup-cell">
                </td>
                <td class="pickem-cell">
                    <label :for="game.gameID+'-dog'"></label>
                    <input v-model="picks" type="checkbox" :id="game.gameID+'-dog'" :value="game.team2Name + sample_spread">
                    +{{ sample_spread }}
                </td>
                <td v-text = "'u'+sample_ou" class="pickem-cell">                    
                </td>     
            </tr>             
        </table>
    </div>
</template>


<script>

import axios from 'axios';

// 8/30/21 to 9/6/21 below
// FUTURE: can either use start and end date OR get all games every time and then filter accordingly based on date....
// I think go with the latter as this is one API call with all odds already.
let all_games_url = "http://localhost:8080/api/games.json?sport=nfl&startDate=1629763200000&endDate=1630972800000"
// let all_games_url = "http://localhost:8080/api/odds.json?sport=nfl"

export default {
    name: "ShowPicks",
    // props: [picks],
    // props: {
    //     picks: {
    //         Array,
    //         required: true
    //     }
    // },
    // props: {
    //     games: Map
    // },
    data() {
        return {
            games:null,
            picks: [],                    
            sample_spread: 7,
            sample_ou: 48.5,
            editIndex: -1,
            fontSize: 15,
            textSizeControlStyle: {
                textAlign:'center',
                cursor: 'pointer'
            }
        }
    },
    methods: {
        
        selectpicks() {
            console.log("USERS PICKS:");
            console.log(this.picks);
            this.$router.push({name:"SelectedPicks"
                              ,params: { selectedpicks: this.picks }});
        }
    },
    mounted() {
        axios
        .get(all_games_url)
        .then(response => {
            console.log('SUCCESS');
            console.log(response.data.results);
            this.games = response.data.results
            })
        .catch(error => {
            console.log(error)
            this.errored = true
            })
    }
}

</script>

<style scoped>

table {
    margin: 0 auto;
    border-collapse:separate; 
    border-spacing:.5em!important;
    
}
.matchup-cell {
    padding-right:.5em;
    width: 5em;
}
.pickem-cell {
    padding: 15px;
    border:solid 2px dodgerblue;
    background: white;
    color: dodgerblue;
    margin: 0 auto;
    cursor: pointer;
    border-radius:5px;
    text-align:center;
    width: 6em;
    height:1em;
    font-size: 1.4vw;
}

.pickem-cell:hover  {
    background-color: dodgerblue;
    color:white;
    cursor:pointer;
}
</style>