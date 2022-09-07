<template>
    <div id="show-picks">
        <div class="grid-cell">
            
        </div>
        <div class="grid-cell">
            <div id="all-game-tables">
                <div v-cloak v-for="(game,index) in games" :key = "game.gameID" :class="game.gameID+'game-table'">
                    <table v-if="validGame(game.date)" :class="game.gameID+'game-table'">
                        <tr :class="'away-row-'+index+'-'+game.gameID">
                            <td rowspan = "2" class="date-cell">  
                                {{ epochToDate(game.date) }}      
                            </td>
                            <td class = "matchup-cell">
                                {{ game.team1Name }}                    
                            </td>
                            <label :for="game.gameID+'-away-label'">
                                <td class="pickem-cell">                                              
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-away-label'" :value="game.team1Name + favOrDog(useDraftkings(game.odds))[0]">
                                            {{ favOrDog(useDraftkings(game.odds))[0] }}                                    
                                </td>
                            </label>
                            <label :for="game.gameID+'-over-label'">
                                <td class="pickem-cell">
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-over-label'" :value="game.team2Name + 'vs.' + game.team1Name + 'o' + useDraftkings(game.odds).overUnder">
                                            o{{ useDraftkings(game.odds).overUnder }}
                                </td>     
                            </label>
                        </tr>        
                        <tr :class="'home-row-'+index+'-'+game.gameID">
                            <td v-text = "game.team2Name" class = "matchup-cell">
                            </td>
                            <label :for="game.gameID+'-home-label'">
                                <td class="pickem-cell">
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-home-label'" :value="game.team2Name + favOrDog(useDraftkings(game.odds))[1]">
                                            {{ favOrDog(useDraftkings(game.odds))[1] }}
                                </td>
                            </label>
                            <label :for="game.gameID+'-under-label'">
                                <td class="pickem-cell">         
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-under-label'" :value="game.team2Name + 'vs.' + game.team1Name + 'u' + useDraftkings(game.odds).overUnder">
                                            u{{ useDraftkings(game.odds).overUnder }} 
                                </td>     
                            </label>        
                        </tr>
                        <tr><td colspan="4"><hr></td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="grid-cell" id="selected-picks-wrapper">
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
                
                <button @click = "selectpicks()">SELECT</button>
            </div>
        </div>
    </div>
</template>


<script>

import axios from 'axios';

let env = process.env.APP_ENV || 'dev';
console.log(`APP_ENV: ${env}`)
let all_games_url = "api/odds.json?sport=nfl";
if (env != "prod") {
    all_games_url = "https://areyouwatchingthis.com/api/odds.json?sport=nfl";
}


// let all_games_url = "http://192.168.68.104/api/odds.json?sport=nfl"

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
            let today = new Date();
            let next_mon = today.setDate(today.getDate() + (((1 + 7 - today.getDay()) % 7) || 7));
            let now = Date.now();
            if (now >= game_date) {
                return false
            }
            else if (game_date > next_mon){
                return false
            }
            else {
                return true
            }
            
            // FCT COMMENTED OUT FOR PRESEASON
            // console.log(game_date);
            // return true
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

#show-picks {
    display:grid;
    /* grid-template-columns: auto auto auto; */
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows:auto;

}

table {
    margin: 0 auto;
    border-collapse:separate; 
    border-spacing:.5em!important;
    color:white;
    /* font-size: 1.2vw; */
    font-size:1vw;

}
.matchup-cell, .date-cell {
    /* padding-right:.5em; */
    width: 6.5vw;
    text-align:left;
    color:white;
}

label {
    display:table-cell;
    background: dodgerblue;
    color: white;
    margin: 0 auto;
    cursor: pointer;
    border-radius:5px;
    border:none;
    width: 7vw !important;
    height: 2vw !important;
    align-items: middle;
    vertical-align: middle;
}
label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

label:hover {
    cursor: pointer;
    background-color: white;
    color:dodgerblue;
    cursor:pointer;
    font-weight: bold;
}

 .pickem-cell {
   text-align: center;
   width: 7vw !important;
   height: 2vw !important;
} 

#selected-picks {
    /* float:right; */
    color:#fff;
    font-size:1.5vw;
    /* position: fixed; */
    /* top:10; */
    /* right:0; */
    /* z-index:10; */
    /* border: 1px solid black; */
    background-color: dodgerblue;
    border-radius: 8px;
    padding:.8vw;
    margin:0 auto;
    width:50%;
    /* margin-right:7vw; */
}

ul, li {
    list-style: none;
    text-decoration-style: None;
    text-align: left;
    overflow-wrap: break-word;
}

button {
    background-color: #1f1f1f;
    border-radius: 8px;
    font-size: 1vw;
    border:none;
    color:#fff;
    height:2vw;
    width:6vw;
}

button:hover {
    cursor: pointer;
    background-color: #fff;
    font-weight:bold;
    color:#1f1f1f;
}
</style>