<template>
    <div id="show-picks">
     
        <div id="selected-picks">
            <strong>
            Selected Picks:
                <ul>
                    <li v-for="(pick,index) in picks"
                        :key = "index"
                        :id="pick+'selected-pick'">
                        {{ pick }}
                    </li>
                </ul>
            </strong>
            
            <button @click = "selectpicks()">Select</button>
        </div>
        <div id="all-game-tables">
            <div v-cloak v-for="(game,index) in games" :key = "game.gameID" :class="game.gameID+'game-table'">
                <table v-if="validGame(game.date)" :class="game.gameID+'game-table'">
                    <tr :class="'away-row-'+index+'-'+game.gameID">
                        <td rowspan = "2">  {{ epochToDate(game.date) }}      </td>
                        <td class = "matchup-cell">
                            {{ game.team1Name }}                    
                        </td>
                        <td class="pickem-cell">          
                            <label :for="game.gameID+'-away-label'"></label>
                            <input v-model="picks" type="checkbox" :id="game.gameID+'-away-label'" :value="game.team1Name + favOrDog(useDraftkings(game.odds))[0]">
                                {{ favOrDog(useDraftkings(game.odds))[0] }}
                        </td>
                        <td class="pickem-cell">
                            <label :for="game.gameID+'-over-label'"></label>
                            <input v-model="picks" type="checkbox" :id="game.gameID+'-over-label'" :value="game.team2Name + 'vs.' + game.team1Name + 'o' + useDraftkings(game.odds).overUnder">
                                o{{ useDraftkings(game.odds).overUnder }}
                        </td>     
                    </tr>        
                    <tr :class="'home-row-'+index+'-'+game.gameID">
                        <td v-text = "game.team2Name" class = "matchup-cell">
                        </td>
                        <td class="pickem-cell">
                            <label :for="game.gameID+'-home-label'"></label>
                            <input v-model="picks" type="checkbox" :id="game.gameID+'-home-label'" :value="game.team2Name + favOrDog(useDraftkings(game.odds))[1]">
                                {{ favOrDog(useDraftkings(game.odds))[1] }}
                        </td>
                        <td class="pickem-cell">         
                            <label :for="game.gameID+'-under-label'"></label>
                            <input v-model="picks" type="checkbox" :id="game.gameID+'-under-label'" :value="game.team2Name + 'vs.' + game.team1Name + 'u' + useDraftkings(game.odds).overUnder">
                                u{{ useDraftkings(game.odds).overUnder }}         
                        </td>     
                    </tr>
                    <tr><td colspan="4"><hr></td></tr>
                </table>
            </div>
        </div>
        
    </div>
</template>


<script>

import axios from 'axios';

let all_games_url = "http://localhost:8080/api/odds.json?sport=nfl"

export default {
    name: "ShowPicks",
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
            // Sends picks to SelectedPicks page where user will then submit picks
            console.log("USERS PICKS:");
            console.log(this.picks);
            this.$router.push({name:"SelectedPicks"
                              ,params: { picks: this.picks }
                              }
                              );
        },
        validGame(game_date) {
            // Checks if the game is valid to be shown
            // let today = new Date();
            // let next_mon = today.setDate(today.getDate() + (((1 + 7 - today.getDay()) % 7) || 7));
            // let now = Date.now();
            // if (now >= game_date) {
            //     return false
            // }
            // else if (game_date > next_mon){
            //     return false
            // }
            // else {
            //     return true
            // }
            
            // FCT COMMENTED OUT FOR PRESEASON
            console.log(game_date);
            return true
        },
        epochToDate(game_date) {
            // converts epoch to clean date
            let date = new Date(game_date);
            let iso = date.toLocaleDateString("en-US")
            return iso
        },
        favOrDog(game_odds) {
            // renders clean spread in UI depending on data passed
            let spread = new String(game_odds.spread);
            if (spread.includes("-")) {
                return [spread.replace("-","+"),spread]
            }
            else {
                return ["-"+spread, "+"+spread]
            }
        },
        useDraftkings(game_odds_all_providers) {
            // Loops through providers to find and return DRAFTKINGS
            let num_prov =  game_odds_all_providers.length;
            for (var i = 0; i < num_prov; i++) {
                var provider = game_odds_all_providers[i].provider;
                if (provider === "DRAFTKINGS") {
                    return game_odds_all_providers[i]
                }
            }
        }
    },
    mounted() {
        console.log('got to mount.')
        axios
        .get(all_games_url)
        .then(response => {
            console.log('SUCCESS');
            // Only send next 20 games. No need to send more
            console.log(response.data.results.slice(0,20));
            this.games = response.data.results.slice(0,20)
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
    color:white;
    font-size: 1.4vw;

    
}
.matchup-cell {
    padding-right:.5em;
    width: 5em;
    color:white;
}
.pickem-cell {
    padding: 15px;
    /* border:solid 1px dodgerblue; */
    background: dodgerblue;
    color: white;
    margin: 0 auto;
    cursor: pointer;
    border-radius:5px;
    text-align:center;
    width: 6em;
    height:1em;
}

.pickem-cell:hover  {
    background-color: white;
    color:dodgerblue;
    cursor:pointer;
}

#all-game-tables {
    margin:0 auto;
    position: relative;
    /* float:left; */
    /* width:50% */
}

/* #empty-div{
    width:33%;
    height:10000px;
    float:left;
} */

#selected-picks {
    /* float:right; */
    color:#fff;
    position: fixed;
    top:10;
    right:0;
    z-index:10;
    /* border: 1px solid black; */
    background-color: dodgerblue;
    border-radius: 8px;
    padding:1vw;
    /* margin-top:10px;
    margin-left:50px;
    
    margin-bottom:50px;  */
    /* width:15%; */
    margin-right:7vw;
}
</style>