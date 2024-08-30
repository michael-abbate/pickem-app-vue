<template>
    <div id="show-picks">
        <div class="grid-cell-1">
        </div>
        <div class="grid-cell-2">
            <h2>
                {{ nflweek }} Games
            </h2>
            <div v-if = "Object.keys(games).length > 0" id="all-game-tables">                
                <div v-cloak v-for="(game,index) in games" :key = "game.gameID" :class="game.gameID+'game-table'">                    
                    <table v-if="validGame(game.round, game.date)" :class="game.gameID+'game-table'">                        
                        <tr :class="'away-row-'+index+'-'+game.gameID">                            
                            <td rowspan = "2" class="date-cell">  
                                {{ epochToDate(game.date) }}                                  
                            </td>
                            <td class = "matchup-cell">
                                {{ game.team1Name }}                    
                            </td>
                            <label :for="game.gameID+'-away-label'">
                                <td class="pickem-cell">                                              
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-away-label'" :value="jsonPick(game,'away')">
                                        <span>{{ jsonPick(game,'away').spread }}</span>
                                </td>
                            </label>
                            <label :for="game.gameID+'-over-label'">
                                <td class="pickem-cell">
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-over-label'" :value="jsonPick(game, 'over')">
                                            <span>o{{ jsonPick(game, 'over').overUnder }}</span>
                                </td>     
                            </label>
                        </tr>        
                        <tr :class="'home-row-'+index+'-'+game.gameID">
                            <td v-text = "game.team2Name" class = "matchup-cell">
                            </td>
                            <label :for="game.gameID+'-home-label'">
                                <td class="pickem-cell">
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-home-label'" :value="jsonPick(game, 'home')">
                                            <span>{{ jsonPick(game, 'home').spread }}</span>
                                </td>
                            </label>
                            <label :for="game.gameID+'-under-label'">
                                <td class="pickem-cell">         
                                        <input v-model="picks" type="checkbox" :id="game.gameID+'-under-label'" :value="jsonPick(game, 'under')">
                                        <span>u{{ jsonPick(game, 'under').overUnder }}</span>
                                </td>     
                            </label>        
                        </tr>
                        <tr><td colspan="4"><hr></td></tr>
                    </table>                    
                </div>                
            </div>
            <div v-else id="all-game-tables">                
                <h2 v-if = "Object.keys(games).length === 0">
                    No games to display!
                </h2>                    
            </div>
        </div>
        <div class="grid-cell-3" id="selected-picks-wrapper">
            <div id="selected-picks">
                <strong>
                Selected Picks:
                    <ul>
                        <li v-for="(pick,index) in picks"
                            :key = "index"
                            :id="pick+'selected-pick'">
                            {{ pick.render_value }}
                        </li>
                    </ul>
                </strong>
                
                <button v-on:click="selectPicks">SELECT</button>
            </div>
        </div>
        
    </div>
    <div class="mobile-submit-button">          
        <p class="countpicks"><strong> Brother, these are locks.</strong></p>
        <p class = "actual-select-button"><button v-on:click="selectPicks">SELECT</button></p>
    </div>
</template>


<script>

import axios from 'axios';
// import store from '../store';
import store from '@/store/store'

// import sample_odds_json from '../sample_odds_results.json';


// let env = process.env.APP_ENV || 'dev';
// let env = 'prod';

// console.log(`Front-end APP_ENV: ${env}`)

// if (env === "dev") {
//     const sample_odds_json = require('../sample_odds_results.json')
// }

// let all_games_url = "api/odds.json?sport=nfl";
// if (env === "prod") {
//     all_games_url = "https://areyouwatchingthis.com/api/odds.json?sport=nfl";
// }

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// let all_games_url = "http://192.168.68.104/api/odds.json?sport=nfl"

export default {
    store,
    // games_json: sample_odds_json, 
    name: "ShowPicks",
    data() {
        return {  
            nflweek: '',          
            games:null,
            env:null,
            use_live_lines: null,
            picks: [],       
            // picks: {'picks': []},             
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
    async created() {

        // const result = await axios.get("/api/odds/.json?sport=nfl");
        // if (env === "prod") {
        console.log('about to hit axios');

        const result = await axios.get("/api/showpicks");
        console.log('hit axios');
        // const result = await axios.get("http://localhost:8000/showpicks");
        // TODO: Add result.data.env check
        const games = result.data.results.slice(0,20);
        console.log('Here are the games!');
        console.log(games);
        this.games = games;
        this.nflweek = games[0].round;        
        // Have to put in check for "Hall of Fame Game" which showed up as first game of Week 1 (HoF game was like 3 weeks before Game 1 of the season)
        if (games[1].round && games[1].round.includes("Week") && !this.nflweek.includes("Week")) {
            this.nflweek = games[1].round;
        }
        else {
            this.nflweek = this.nflweek.includes("Week") ? this.nflweek: this.nflweek.split(" ").slice(1,).join(" ")
        }
        this.env = result.data.env;
        this.use_live_lines = result.data.use_live_lines;
        console.log(`Front-end ENV fetched from back-end env: ${this.env}`);
        console.log(`Using live lines: ${this.use_live_lines}`);
        // }
        // else {
            // console.log('Returning dev games...');

            // this.games = sample_odds_json.results.slice(0,16);
            // console.log(sample_odds_json.results.slice(0,16));
        // }
    },
    methods: {    
        selectPicks() {            
            // moves selected picks to next page for final submission
            if (this.picks.length>=5) {
                console.log(`selectPicks: ${this.picks}`)
                this.$store.commit('SELECT_PICKS', {
                    picks: this.picks,
                    nflweek: this.nflweek
                    });
                this.$router.push('/selected');
            }
            else {
                alert('Please review picks!');
            }
        
        },
        validGame(game_round, game_date) {                        
            if (this.nflweek===game_round) {
                    return true
                }
            // Checks if the game is valid to be shown
            if (this.env === 'prod' || this.use_live_lines === true) {            
                let today = new Date();
                let next_tues = today.setDate(today.getDate() + (((2 + 7 - today.getDay()) % 7) || 7));
                let now = Date.now();
                if (now > game_date) {
                    return false
                }
                else if (game_date > next_tues){
                    return false
                }
                else {
                    return true
                }                
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
            // let iso = date.toLocaleDateString("en-US")
            // let iso = date.toLocaleString("en-US", {timeZone: "America/New_York",timeStyle:"short", dateStyle: "short"});
            let iso = date.toLocaleString("en-US", {timeStyle:"short", dateStyle: "short"});

            return iso.replace(",","")
        },
        favOrDog(game_odds) {
            // renders clean spread in UI depending on data passed
            let spread = new String(game_odds.spread);
            if (spread === 'pk') {
                return ['pk','pk']
            }
            else if (spread.includes("-")) {
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
        },
        jsonPick(game, label) {
            let dk_odds = this.useDraftkings(game.odds);
            let game_id = game.gameID;
            let team1_name = game.team1Name;
            let team2_name = game.team2Name;
            let away_sp = this.favOrDog(dk_odds)[0];
            let home_sp = this.favOrDog(dk_odds)[1];
            let over_under = dk_odds.overUnder;
            let nflweek = game.round;

            if (label === 'away') {
                return {"render_value": team1_name + " " + away_sp, "gameID":game_id, "team1Name": team1_name, "team2Name":team2_name, "spread": away_sp, "team_selected": "team1", "week": nflweek}
            }
            else if (label === 'home') {
                return {"render_value": team2_name + " " + home_sp, "gameID":game_id, "team1Name": team1_name, "team2Name":team2_name, "spread": home_sp, "team_selected": "team2", "week": nflweek}
            }
            else if (label === 'over') {
                return {"render_value": team1_name + " vs. " + team2_name + " o" + over_under, "gameID":game_id, "team1Name": team1_name, "team2Name":team2_name, "overUnder": over_under, "week": nflweek}
            }
            else if (label === 'under') {
                return {"render_value": team1_name + " vs. " + team2_name + " u" + over_under, "gameID":game_id, "team1Name": team1_name, "team2Name":team2_name, "overUnder": over_under, "week": nflweek}
            }
        }

    }
}

</script>

<style scoped>

@media (pointer:fine) {
    .mobile-submit-button {
        display: none;
    }
    #show-picks {
        display:grid;
        /* grid-template-columns: auto auto auto; */
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows:auto;
        justify-content:center;

    }

    .grid-cell-2{
        overflow:auto;
        height:90vh;
    }

    table {
        
        border-collapse:separate; 
        border-spacing:.25em!important;
        color:white;
        font-size:1vw;
    }

    .date-cell {
        /* padding-right:.5em; */
        width: 8.5vw;
        font-size:.9vw;
        text-align:left;
        color:white;
    }
    .matchup-cell{
        /* padding-right:.5em; */
        width: 6.5vw;
        text-align:left;
        color:white;
    }

    span {
        display:table-cell;
        background-color: dodgerblue;
        color: white;
        margin: 0 auto;
        cursor: pointer;
        border: 2px solid dodgerblue !important;
        border-radius:5px;
        border:none;
        width: 7vw !important;
        height: 3vw !important;
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

    input:checked + span {
        background-color:white;
        color:dodgerblue;
        border: 2px solid dodgerblue;
        font-weight:bold;
    }

    span:hover {
        cursor: pointer;
        background-color: white;
        border: 2px solid dodgerblue;
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
        font-size:1.1vw;
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
}

@media (pointer:coarse) {
    #show-picks {
        display:grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
        justify-content:center;
        padding-bottom:50px;
    }

    .mobile-submit-button {
        position: -webkit-fixed; /* Safari */
        position: fixed;
        bottom: 0;
        background-color:#303030;
        height:20vw;
        display:flex;
        z-index:100;
        width:100%;
        align-items:center;
    }
    .countpicks {
        float:left;
        width:50%;
    }
    .actual-select-button {
        float:right;
        width:50%;
        text-align:right;

    }
    .mobile-submit-button button{        
        background-color: dodgerblue;
        border-radius: 6px;
        width:20vw;
        height:10vw;
        border:none;
        color:#fff;
        margin:10px; 
        font-weight:bold;
    }

    .grid-cell-2 {
        margin:5vw;
    }
    .grid-cell-1, .grid-cell-3 {
        display:None;
    }

    table {        
        border-collapse:separate; 
        border-spacing:.15em!important;
        color:white;
        font-size:3.5vw;
    }
    .date-cell {
        width: 23vw;
        font-size:2.5vw;
        text-align:left;
        color:white;
    }
    .pickem-cell {
        text-align: center;
        width: 18vw !important;
        height: 6vw !important;
    } 

    .matchup-cell{
        /* padding-right:.5em; */
        width: 20vw;
        font-size:3.25vw;
        text-align:left;
        color:white;
    }

    span {
        display:table-cell;
        background-color: dodgerblue;
        color: white;
        margin: 0 auto;
        border: 2px solid dodgerblue !important;
        border-radius:5px;
        border:none;
        width: 23vw !important;
        height: 8vw !important;
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

    input:checked + span {
        background-color:white;
        color:dodgerblue;
        border: 2px solid dodgerblue;
        font-weight:bold;
    }
}
</style>